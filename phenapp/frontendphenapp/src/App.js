//import React from "react";

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate, useHistory, useParams } from "react-router-dom";
import './App.css'; 
// si el export en Login.js està al final no posem claus; si el emporta està al principi posem claus
import Login from "./pages/Login";
import './pages/Login'
import './pages/Register'
import Register from "./pages/Register";
import { Navigation } from "./components/Navigation";
import logo from "./logos/logo.png";

function App() {
  //const history = useHistory()
  //const handleClick = () => history.push('./pages/Register')
  //const handleClick2 = () => history.push('./pages/Login')
  //si poso el useNavigate la pàgina no es visualitza, només el css
  //calia posar el Router a la pàgina index
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
          Phenapp és un pàgina que permet a un clínic introduir termes de HPO
        </p>    
        <p>
          Pots iniciar sessió o registrar-te si encara no ho has fet
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
        
        <button className="button" onClick = {() => {navigate('./pages/Login');}}>Login
        </button>
        <button className="button" onClick = {() => {navigate('./pages/Register');}}>Register
        </button>
        
      </main>
          
      <footer className="App-footer">
        <p>Sobre nosaltres</p>
      </footer>
    </div>
  );
}
export default App;