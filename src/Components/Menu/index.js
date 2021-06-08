import React,{Component} from "react"
import {Navbar,Nav} from 'react-bootstrap'
import Option from "./Option"
import EcommerceContext from "../../Context/EcommerceContext"
const styles = {
    saludo:{color:"#0d6efd"}
  
   } 

function Menu(props){
        return(
            <EcommerceContext.Consumer>
             {
                context=>
            <div>

                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">Ecommerce-Robledo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        {
                                    context.userLogin &&
                                    <>
                                    <Option path="/" label="Inicio"/> 
                                    <Nav.Link  onClick={()=>context.logoutUser(false)}>Salir</Nav.Link> 
                                    <Nav.Link disabled style={styles.saludo}>Hola {context.userInfo?.nombre}</Nav.Link>
                                    </>
                                }
                                {
                                    !context.userLogin &&
                                    <>
                                    <Option path="/alta" label="Registro"/>  
                                    <Option path="/ingreso" label="Ingresar"/>    
                                    </>
                                }
                                </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
               }
            
               </EcommerceContext.Consumer>
        )
    
}
export default Menu;