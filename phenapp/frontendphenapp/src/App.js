//import React from "react";

import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useNavigate, useHistory, useParams } from "react-router-dom";
import {useForm} from "react-hook-form" //per agafar dades del formulari
import './App.css'; 
import {creaClinic} from "./pages/Clinicsapi"
// si el export en Login.js està al final no posem claus; si el emporta està al principi posem claus
import Login from "./pages/Login";
import './pages/Login'
import './pages/Register'
import './components/Hello'
import Register from "./pages/Register";
import { Navigation } from "./components/Navigation";
import logo from "./logos/logo.png";
import Hello from "./components/Hello";

function App() {
  const navigate = useNavigate()
  //const history = useHistory()
  //const handleClick = () => history.push('./pages/Register')
  //const handleClick2 = () => history.push('./pages/Login')
  //si poso el useNavigate la pàgina no es visualitza, només el css
  //calia posar el Router a la pàgina index
  //const {register, handleSubmit, formState:{
  //  errors  
  //}} = useForm()

  //const onSubmit = handleSubmit(async data =>{
    //console.log(data)
  //  const res = await creaClinic(data)
  //})
  
  return (
    <div className="App">
      
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-principal">
          <h1>Benvingut a phenapp!</h1>  
        </div> 
      </header>
      <main className="App-main">
        <p>
          Phenapp és un pàgina que permet a un clínic introduir termes de HPO
        </p>    
        <p>
          Pots iniciar sessió o registrar-te si encara no ho has fet
        </p>
        
        <div>
          <Hello text="bye world" />
        </div>

        <button className="button" onClick = {() => {navigate('./pages/Login');}}>Login
        </button>
        <button className="button" onClick = {() => {navigate('./pages/Register');}}>Register
        </button>
        <button className="button" onClick = {() => {navigate('./pages/ClinicsPage');}}>Clinics
        </button>
        
        
      </main>
          
      <footer className="App-footer">
        <p>Sobre nosaltres</p>
      </footer>
    </div>
  );
}
export default App;