import React,{useState,useEffect} from "react"
import Producto from "../Components/Producto"
import firebase from "../Config/firebase"
import ButtonWithLoading from "../Components/Forms/ButtonWithLoading"
import FormGroup from "../Components/Forms/FormGroup"
import AlertCustom from "../Components/AlertCustom"
import {Row,Col} from 'react-bootstrap'
import EcommerceContext from "../Context/EcommerceContext"

function DetallePage(props) {
    const id = props.match.params.id;
    const [producto,setProducto] = useState({});
    const [loading,setLoading] = useState(true);
    const [form,setForm] = useState({name:'',price:'', sku:'', description:''})
    const [formAdd,setFormAdd] = useState({name:'',price:'', sku:'',description:''})
    const [alert,setAlert] = useState({variant:"",text:""})
        //componentDidMount
    useEffect(
        ()=>{
            firebase.db.doc("productos/"+id)
            .get()
            .then(doc=>{
                console.log("Doc",doc)
                setProducto(doc)
                setLoading(false)
                setForm({name:doc.data().name,price:doc.data().price,sku:doc.data().sku,description:doc.data().description})
            })
        },
        []
    )
    const handleChange = (event)=>{
        const name = event.target.name
        const value = event.target.value
        console.log(name,value)
        setForm({...form,[name]:value})
    }
    const handleChangeAdd = (event)=>{
        const name = event.target.name
        const value = event.target.value
        console.log(name,value)
        setFormAdd({...formAdd,[name]:value})
    }
    const handleSubmit = (event)=>{
        event.preventDefault()
        console.log(form)
        firebase.db.doc("productos/"+id)
        .set({
            name:form.name,
            price:form.price,
            description:form.description,
            sku:form.sku
        },{merge:true})
        .then(doc=>{
            setAlert({variant:"success",text:"Producto Editado Correctamente"})
            console.log("Doc Editado",doc)
        })
        .catch(error=>{
            setAlert({variant:"danger",text:"Se ah Producido un Error"})
            console.log("error",error)
        })
    }
    const handleSubmitAdd = (event)=>{
        event.preventDefault()
        console.log(formAdd)
        firebase.db.collection("productos")
        .add({
            name:formAdd.name,
            price:formAdd.price,
            description:formAdd.description,
            sku:formAdd.sku
        })
        .then(doc=>{
            setAlert({variant:"success",text:"Producto Añadido Correctamente"})
            console.log("Doc Delete",doc)
        })
        .catch(error=>{
            setAlert({variant:"danger",text:"Se ah Producido un Error"})
            console.log("error",error)
        })
    }
    const handleDelete = (event)=>{
        event.preventDefault()
        firebase.db.doc("productos/"+id)
        .delete()
        .then(doc=>{
            setAlert({variant:"success",text:"Producto Eliminado Correctamente"})
            console.log("Doc Eliminado",doc)
        })
        .catch(error=>{
            setAlert({variant:"danger",text:"Se ah Producido un Error"})
            console.log("error",error)
        })
    }
    
    if(loading){
        return(
            <div>
                loading...
            </div>
        )
    }else{
        return(
            <EcommerceContext.Consumer>
             {
                context=>
            <div>
            <Producto id={producto.id} data={producto.data()}  verDetalle={false} extendida={true}/>
            {
                            context.userLogin &&
                                    <>
            <Row>
            <Col>
            <h3>Editar Producto</h3>
            <form onSubmit={handleSubmit}>
            <FormGroup label="Nombre" name="name" type="text" placeholder="Ingrese Nombre del Producto" value={form.name} change={handleChange} />
            <FormGroup label="Precio" name="price" type="number" placeholder="Ingrese el Precio" value={form.price} change={handleChange} />
            <FormGroup label="SKU" name="sku" type="text" placeholder="Ingrese el SKU" value={form.sku} change={handleChange} />
            <FormGroup label="Descripción" name="description" type="Text1" placeholder="Ingrese La Descripción" value={form.description} change={handleChange} />
            <ButtonWithLoading loading={loading}>Guardar</ButtonWithLoading> 
            <ButtonWithLoading loading={loading}  event={handleDelete}>Eliminar Producto</ButtonWithLoading>         
            </form>
            </Col>
           <br></br>
            <Col>
            <h3>Agregar producto</h3>
            <form onSubmit={handleSubmitAdd}>
            <FormGroup label="Nombre" name="name" type="text" placeholder="Ingrese Nombre del Producto" value={formAdd.name} change={handleChangeAdd} />
            <FormGroup label="Precio" name="price" type="number" placeholder="Ingrese el Precio" value={formAdd.price} change={handleChangeAdd} />
            <FormGroup label="SKU" name="sku" type="text" placeholder="Ingrese el SKU" value={formAdd.sku} change={handleChangeAdd} />
            <FormGroup label="Descripción" name="description" type="Text1" placeholder="Ingrese La Descripción" value={formAdd.description} change={handleChangeAdd} />
            <ButtonWithLoading loading={loading}>Guardar</ButtonWithLoading>  
            </form>
            </Col>
            </Row>
            <AlertCustom variant={alert.variant} text={alert.text} /> 
                                        </>
            } 
        </div>
        }
        </EcommerceContext.Consumer>                
        )
    }
        
    
}
export default DetallePage;

