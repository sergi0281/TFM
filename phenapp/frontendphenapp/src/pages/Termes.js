//import React from "react";

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
import './Termes.css'; 
import { Navigation } from "../components/Navigation";
import logo from "../logos/logo.png";

function Termes() {
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
          Aquí mostrarem termes relacionats amb malaltia  
        </p>
      </main>
    </div>
  );
}
export default Termes;