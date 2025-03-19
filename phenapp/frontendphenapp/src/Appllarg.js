//import React from "react";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from "react-router-dom";
import './Appllarg.css'; 
import logo from "./logos/logo.png";

function Appllarg() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-principal">
          <h1>Benvingut a phenapp!</h1>
            <p>
              Phenapp és un pàgina que permet a un clínic introduir termes de HPO
            </p>      
        </div> 
      </header>
      <main className="App-main">
        <p>
          Aquest és el cos de la pàgina de phenapp
        </p>
        <input type="text" id="inputTerme" 
          placeholder="Introdueix el teu nom">
        </input>
        <button onclick="redirigir()">Clica'm</button>
      </main>
      
      <footer className="App-footer">
        <p>Sobre nosaltres</p>
      </footer>
    </div>
    );
}

export default Appllarg;