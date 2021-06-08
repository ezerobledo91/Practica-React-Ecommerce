import React,{useState} from "react"
import firebase from "../Config/firebase"
//import Button from 'react-bootstrap/Button'
import ButtonWithLoading from "../Components/Forms/ButtonWithLoading"
import FormGroup from "../Components/Forms/FormGroup"
import AlertCustom from "../Components/AlertCustom"
import {useHistory} from "react-router-dom"

function RegistroPage(){
    const [form,setForm] = useState({nombre:'',apellido:'',email:'',password:''})
    const [loading,setLoading] = useState(false)
    const [alert,setAlert] = useState({variant:"",text:""})
    const history = useHistory()
    const handleSubmit = (event)=>{
        event.preventDefault()
        setLoading(true)
        console.log(form)
        firebase.auth.createUserWithEmailAndPassword(form.email,form.password)
        .then(data=>{
            console.log("Registro",data.user.uid)
            firebase.db.collection("usuarios")
            .add({
                nombre: form.nombre,
                apellido: form.apellido,
                email: form.email,
                userId: data.user.uid
            })
            .then(data=>{
                setLoading(false)
                setAlert({variant:"success",text:"Registro Exitoso!"})
                console.log(data);
                history.push("/ingreso")
            })
            .catch(error=>{
                setLoading(false)
                setAlert({variant:"danger",text:"Ha ocurrido un error"})
                console.log("Error add",error)
            })
        })
        .catch(error=>{
            setLoading(false)
            setAlert({variant:"danger",text:"Ha ocurrido un error"})
            console.log("Error dasdsa",error)
        })
    }
    const handleChange = (event)=>{
        const name = event.target.name
        const value = event.target.value
        console.log(name,value)
        setForm({...form,[name]:value})
    }
    
    return(
        /* */
        
            <form onSubmit={handleSubmit}>
                <FormGroup label="Nombre" name="nombre" type="text" placeholder="Ingrese su nombre" value={form.nombre} change={handleChange} />
                <FormGroup label="Apellido" name="apellido" type="text" placeholder="Ingrese su apellido" value={form.apellido} change={handleChange} />
                <FormGroup label="Email" name="email" type="email" placeholder="Ingrese su email" value={form.email} change={handleChange} />
                <FormGroup label="Contraseña" name="password" type="password" placeholder="Ingrese su contraseña" value={form.password} change={handleChange} />
                
                <ButtonWithLoading loading={loading}>Registrarse</ButtonWithLoading>
                
                <AlertCustom variant={alert.variant} text={alert.text} />
            </form>
       
    )
    
}
export default RegistroPage;