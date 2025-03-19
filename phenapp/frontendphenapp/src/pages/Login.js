//import React from "react";

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
import './Login.css'; 
import { Navigation } from "../components/Navigation";
import logo from "../logos/logo.png";

function Login() {
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
          Aquí realitzaríem la verificació del login i sortiria la
          pàgina principal del clínic que s'ha logat  
        </p>
        <button className="button" onClick = {() => {navigate('/');}}>Torna
        </button>
        <button className="button" onClick = {() => {navigate('./pages/Pacients');}}>Pacients
        </button>
        <button className="button" onClick = {() => {navigate('./pages/Termes');}}>HPOs
        </button>
      </main>
    </div>
  );
}
export default Login;