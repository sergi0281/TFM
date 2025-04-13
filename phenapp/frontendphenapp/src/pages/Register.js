//import React from "react";

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
import App from '../App';
import { Navigation } from "../components/Navigation";
import logo from "../logos/logo.png";
import axios from 'axios';

function Register() {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    nom:"",
    pass:"",
    mail:"",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.nom.value;
    const password = event.target.pass.value;
    // a name i password tinc les coses que ha introduït l'usuari
    console.log(inputs.nom);
    console.log(inputs.pass);
    console.log(inputs.mail);
    //https://github.com/desphixs/JWT-Django-Rest-Framework-React/blob/master/frontend/src/views/Loginpage.js
    //axios.get("http://localhost:8000/phenapp/clinics/?nom=${sergi}",
    axios.post('http://localhost:8000/api/clinics/register/', {
        nom: inputs.nom,
        password: inputs.pass,
        email: inputs.mail
    
      },
      {
        headers: {
            'Content-Type': 'application/json'  // Indicar que és JSON
        }
      })
      .then(response => {
        console.log(response.data);
        //console.log("Dades rebudes:", JSON.stringify(response.data, null, 2));  // Formatat bonic
      })
      .catch(error => {
        console.error('Error obtenint usuari:', error);
      });
  }
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
        <form onSubmit={handleSubmit}>
          <label>Nom:</label>
          <input type="text" id="inputNom" name="nom"
            placeholder="Introdueix el teu nom" onChange={handleChange} > 
          </input>
          <br/>
          <label>Password:</label>
          <input type="text" id="inputPass" name="pass"
            placeholder="Introdueix el password" onChange={handleChange} > 
          </input>
          <br/>
          <label>Correu:</label>
          <input type="text" id="inputMail" name="mail"
            placeholder="Introdueix el mail" onChange={handleChange} > 
          </input>
          <br/>
          <button className="button" type="submit" onClick = {() => {navigate('/pages/RegisterOK');}}>Registre</button>
          <button className="button" onClick = {() => {navigate('/');}}>Torna
          </button> 
        </form>
      </main>
    </div>
  );
}
export default Register;