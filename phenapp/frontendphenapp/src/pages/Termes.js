//import React from "react";

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import logo from "../logos/logo.png";

function Termes() {
  const navigate = useNavigate()
  //useEffect(() => {
    //const x = document.getElementsByClassName("mat-cell cdk-cell cdk-column-entrezGeneSymbol mat-column-entrezGeneSymbol ng-star-inserted");
    //document.getElementById("demo").innerHTML = 
    //  'Els gens relacionats són: ' + x[0].innerHTML + x[1].innerHTML + x[2].innerHTML;
  //}, []);
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
        <label>Malaltia:</label>
        <input type="text" id="inputMalaltia" 
          placeholder="Malatia..."> 
        </input>
        <button className="button" onclick="Termes()">Cerca
        </button>
        <p id="demo"></p>
        <button className="button" onClick = {() => {navigate('/');}}>Torna
        </button>
      </main>
    </div>
  );
}
export default Termes;