import React,{useState} from "react"
//import Button from 'react-bootstrap/Button'
import {Button,Spinner} from 'react-bootstrap'
import "./ButtonWithLoading.css"
 
function ButtonWithLoading(props){
    const {variant,type,loading,event} = props    
    return(
        /* */
        <Button 
            type={type || "submit"} 
            variant={variant || "primary"} 
            disabled={loading} 
            className="buttonWithLoading"
            onClick={event}
        >
            {
                loading &&
                <Spinner animation="border" size="sm" />
            }
            
            {props.children}
        </Button>
    )
    
}
export default ButtonWithLoading;
