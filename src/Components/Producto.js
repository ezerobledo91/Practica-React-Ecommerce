import React,{Component,useState} from "react"
import {Link} from "react-router-dom"
import Card from 'react-bootstrap/Card'
import ButtonWithLoading from '../Components/Forms/ButtonWithLoading'
import AlertCustom from '../Components/AlertCustom'
import EcommerceContext from "../Context/EcommerceContext"

const styles = {
    card:{ width: '18rem',marginBottom:"10px" },
    button:{marginLeft:"5px"},
    link:{color:"#FFFFFF"}
}
function Producto(props){
    const {data} = props
    
    const verDetalle = (props.verDetalle!==false?true:false);
    const extendida = (props.extendida==true?true:false);
    const id= props.id
    const {price,name,description,sku}=props.data
    const [alert,setAlert] = useState({variant:"",text:""})

    const comprar = ()=>{
        if(data.stock-1==0){
            setAlert({variant:"success",text:"No hay Stock"})
        }else{
            setAlert({variant:"success",text:"Gracias por Su Compra!"})
        }
    }
    return(
        <EcommerceContext.Consumer>
        {
                context=>
        <Card style={styles.card}>
        <Card.Body>
            <Card.Title>{name}  - ${price} - SKU: {sku} </Card.Title>
            {
                extendida && 
                <>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </>
            }
                {
                 context.userLogin &&
                    <ButtonWithLoading variant="primary" event={comprar}>Comprar</ButtonWithLoading>
                }
            {
                verDetalle && 
                <ButtonWithLoading style={styles.button} variant="primary"><Link style={styles.link} to={"/producto/"+id}>Ver Detalle</Link></ButtonWithLoading>
            }
            
        </Card.Body>
        <AlertCustom variant={alert.variant} text={alert.text} />
    </Card>
    }           
    </EcommerceContext.Consumer>
    )
}
export default Producto;

