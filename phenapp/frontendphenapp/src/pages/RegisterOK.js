//import React from "react";

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
import logo from "../logos/logo.png";

function RegisterOK() {
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
          L'usuari s'ha registra correctament
        </p>
        <p>
          Benvingut a l'aplicació. Ara ja pot fer login 
        </p> 
        <button className="button" onClick = {() => {navigate('/');}}>Torna  
        </button> 
      </main>
    </div>
  );
}
export default RegisterOK;