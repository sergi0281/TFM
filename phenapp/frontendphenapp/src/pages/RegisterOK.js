//import React from "react";

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
import './Register.css'; 
import { ClinicsPage } from "./pages/ClinicsPage";
import { ClinicsFormPage } from "./pages/ClinicsFormPage";
import { Navigation } from "./components/Navigation";
import logo from "./logos/logo.png";

function RegisterOK() {
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
      </main>
    </div>
  );
}
export default RegisterOK;