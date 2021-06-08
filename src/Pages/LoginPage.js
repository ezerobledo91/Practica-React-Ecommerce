import React,{useState, useContext} from "react"
import firebase from "../Config/firebase"
import {useHistory} from "react-router-dom"
import ButtonWithLoading from "../Components/Forms/ButtonWithLoading"
import FormGroup from "../Components/Forms/FormGroup"
import AlertCustom from "../Components/AlertCustom"
import EcommerceContext from "../Context/EcommerceContext"
const styles = {
       button:{
        marginLeft:"5px",
       }
      }

function LoginPage(){
    const context = useContext(EcommerceContext)
    const [form,setForm] = useState({email:'',password:''})
    const [loading,setLoading] = useState(false)
    const history = useHistory()
    const [alert,setAlert] = useState({variant:"",text:""})
    const handleSubmit = (event)=>{
        event.preventDefault()
        setLoading(true)
        console.log(form)
        firebase.auth.signInWithEmailAndPassword(form.email,form.password)
        .then(data=>{
            setLoading(false)
            setAlert({variant:"success",text:"Ingreso Exitoso!"})
            firebase.db.collection("usuarios")
            .where("userId","==",data.user.uid)
            .get()
            .then(querySnapshot=>{
                context.loginUser(querySnapshot.docs[0]?.data())
                
            })
            console.log("Login Ok",data)
            history.push("/")
        })
        .catch(error=>{
            setLoading(false)
            setAlert({variant:"danger",text:"Se ah producido un error!"})
            console.log("Error",error)
            console.log("Error",error.code)
            //alert(error.code)
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
               <FormGroup label="Email" name="email" type="email" placeholder="Ingrese su email" value={form.email} change={handleChange} /> 
               <FormGroup label="Contraseña" name="password" type="password" placeholder="Ingrese su contraseña" value={form.password} change={handleChange} />        
               <ButtonWithLoading loading={loading}>Ingresar</ButtonWithLoading>
               <AlertCustom variant={alert.variant} text={alert.text} />
             </form>
            
    )
    
}
export default LoginPage;