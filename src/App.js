import logo from './logo.svg';
import './App.css';
import React,{useState} from "react"
import {BrowserRouter,Route} from "react-router-dom"
import HomePage from "./Pages/HomePage"
import Menu from "./Components/Menu/index"
import RegistroPage from "./Pages/RegistroPage"
import LoginPage from "./Pages/LoginPage"
import DetallePage from "./Pages/DetallePage"
import {Container} from 'react-bootstrap'
import GlobalState from "./Context/GlobalState"
function App() {
  const[userLogin,setUserLogin]=useState(false);  

  return (
    <GlobalState>
    <BrowserRouter>
      <Menu />
      <Container>
        <Route path="/" component={HomePage} exact />
        <Route path="/alta" component={RegistroPage} exact />
        <Route path="/ingreso" component={LoginPage} exact />
        <Route path="/producto/:id" component={DetallePage} exact />
      </Container>    
    </BrowserRouter>
    </GlobalState>
  );
}

export default App;
