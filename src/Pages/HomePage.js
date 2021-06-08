import React,{useState,useEffect} from "react"
import Producto from "../Components/Producto"
import firebase from "../Config/firebase"
function HomePage(props) {
    
    const [productos,setProductos] = useState([]);
    const [loading,setLoading] = useState(true);
    //componentDidMount
        useEffect(
            ()=>{
                firebase.db.collection("productos")
                .get()
                .then(querySnapshot=>{
                    console.log(querySnapshot.docs)
                    setProductos(querySnapshot.docs);
                    setLoading(false);
                    console.log("productos",querySnapshot.docs)
                })
            },
            []
        )
    
    if(loading){
        return(
            /* */
            <div>
                loading...
            </div>
        )
    }else{
        return(
            /* */
            <div>
                
                {productos.map(producto=><Producto id={producto.id} key={producto.id} data={producto.data()} />)}
                
            </div>
        )
    }
        
    
}
export default HomePage;


