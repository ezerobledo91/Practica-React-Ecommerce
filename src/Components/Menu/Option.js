import React from "react"
import {Link} from "react-router-dom"
import {Navbar,Nav} from 'react-bootstrap'

    
function Option(props){
    return(
        <Nav.Link as={Link} to={props.path}>{props.label}</Nav.Link>
    )
}

export default Option;