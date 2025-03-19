//import React from "react";

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
import './Register.css'; 
import App from '../App';
import { Navigation } from "../components/Navigation";
import logo from "../logos/logo.png";

function Register() {
  const navigate = useNavigate()
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
          Registre a l'aplicació
        </p>    
  
        <label>Nom:</label>
        <input type="text" id="inputTerme" 
          placeholder="Introdueix el teu nom"> 
        </input>
        <br/>
        <label>Password:</label>
        <input type="text" id="inputPass" 
          placeholder="Introdueix el password"> 
        </input>
        <br/>
        <label>Password:</label>
        <input type="text" id="inputPassAgain" 
          placeholder="Reintrodueix el password"> 
        </input>
        <br/>
        <label>Correu:</label>
        <input type="text" id="inputMail" 
          placeholder="Introdueix el mail"> 
        </input>
        <br/>
        <button className="button" onclick="redirigir()">Registra'm</button> 
        <button className="button" onClick = {() => {navigate('/');}}>Torna
        </button>  
      </main>
    </div>
  );
}
export default Register;