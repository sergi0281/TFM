//import React from "react";

import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useNavigate, useHistory, useParams } from "react-router-dom";
import {useForm} from "react-hook-form" //per agafar dades del formulari
import './Login.css'; 
import { Navigation } from "../components/Navigation";
import logo from "../logos/logo.png";
import Hello from "../components/Hello";
import axios from 'axios';

function Login() {
  //const url = axios.create({
  //  baseURL: 'http://localhost:8000/api/'
  //})
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
      nom:"",
      pass:"",
  });
  // es modifica cada cop que canvia el valor del camp
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  const axiosGetSubmit = (event) => {
    event.preventDefault();
  
    axios.get('http://localhost:8000/api/clinics/register/', {
    })
    .then(response => {
      console.log(response.data);
      //console.log("Dades rebudes:", JSON.stringify(response.data, null, 2));  // Formatat bonic
    })
    .catch(error => {
      console.error('Error obtenint usuari:', error);
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.nom.value;
    const password = event.target.pass.value;
    // a name i password tinc les coses que ha introduït l'usuari
    console.log(inputs.nom);
    console.log(inputs.pass);
    console.log(name);
    console.log(password);
    //https://github.com/desphixs/JWT-Django-Rest-Framework-React/blob/master/frontend/src/views/Loginpage.js
    //axios.get("http://localhost:8000/phenapp/clinics/?nom=${sergi}",
    axios.post('http://localhost:8000/api/clinics/login/', {
        nom: inputs.nom,
        password: inputs.pass,
        //mail: inputs.mail
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
          Aquí realitzaríem la verificació del login i sortiria la
          pàgina principal del clínic que s'ha logat  
        </p>
        <div>
          <Hello text="hello world" />
        </div>
        <div>
          <Hello text={inputs.nom}/>
        </div>
        <div>
          <Hello text={inputs.pass}/>
        </div>
        <label>Nom:</label>
        <form onSubmit={handleSubmit}>
          <input type="text" id="inputNom"
            name="nom"
            //value={inputs.nom || ""}
            value={inputs.nom}
            onChange={handleChange} 
            //placeholder="Introdueix el teu nom" 
            //{...register("nom", {required: true})}
          //{errors.nom && <span> camp requerit </span>}
          />
          <br/>
          
          <label>Password:</label>
          <input type="text" id="inputPass" 
            name="pass"
            value={inputs.pass || ""} 
            onChange={handleChange}
            //placeholder="Introdueix el password" 
            //{...register("pass", {required: true})}
          />
          <label>Mail:</label>
          <input type="text" id="inputMail" 
            name="mail"
            value={inputs.mail || ""} 
            onChange={handleChange}
            //placeholder="Introdueix el password" 
            //{...register("pass", {required: true})}
          />
          <button className="button" onClick={() => {navigate('/pages/Login');}}>Login
          </button>
          <button className="button" type="submit" onClick={() => {navigate('/pages/ClinicsFormPage');}}>LoginS</button>
          <br/>
        </form>
        <form onSubmit={axiosGetSubmit}>
        <button className="button" type="submit">Axiosget</button>
          <br/>
        </form>

        <button className="button" onClick = {() => {navigate('/');}}>Torna
        </button>
        <button className="button" onClick = {() => {navigate('/pages/Pacients');}}>Pacients
        </button>
        <button className="button" onClick = {() => {navigate('/pages/Termes');}}>HPOs
        </button>
      </main>
    </div>
  );
}
export default Login;