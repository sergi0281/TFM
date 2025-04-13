//import React from "react";

import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import { Link, useNavigate, useHistory, useParams } from "react-router-dom";
import {useForm} from "react-hook-form" //per agafar dades del formulari
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
  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.nom.value;
    const password = event.target.pass.value;
    // a name i password tinc les coses que ha introduït l'usuari
    console.log(inputs.nom);
    console.log(inputs.pass);
    console.log(name);
    console.log(password);
    axios.post('http://localhost:8000/api/clinics/login/', {
        nom: inputs.nom,
        password: inputs.pass,
    },
    {
      headers: {
          'Content-Type': 'application/json'  // Indicar que és JSON
      }
    })
    .then(response => {
      console.log("hola")
      console.log(response.data);  //{message: 'Login correcte', user: {…}}
      const clinic_id = response.data.user.id; 
      //navigate('/pages/InicialClinic', { state: { nom: inputs.nom } });
      navigate('/pages/InicialClinic', { state: { 
                    nom: inputs.nom,
                    id: clinic_id } });
    
    })
    .catch(error => {
      console.error('Error obtenint usuari:', error);
    });
  }
  //botó per cridar un component 
  //<button className="button" onClick={() => {<Hello text={inputs.nom}/>}}>Login Component
  //</button>
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="App-principal">
          <h1>Benvingut a phenapp!</h1>  
        </div> 
      </header>
      <main className="App-main">
        <p>
          Posa el teu nom i la teva contrassenya per accedir a la teva pàgina inicial de phenapp. 
          Si encara no tens un compte actiu amb nosaltres, no oblidis registrar-te!  
        </p>
        <form onSubmit={handleSubmit}>
          <label>Nom:</label>
          <input type="text" id="inputNom"
            name="nom"
            value={inputs.nom}
            onChange={handleChange} 
          />
          <br/>
          <label>Password:</label>
          <input type="text" id="inputPass" 
            name="pass"
            value={inputs.pass || ""} 
            onChange={handleChange}
          />
          <label>Mail:</label>
          <input type="text" id="inputMail" 
            name="mail"
            value={inputs.mail || ""} 
            onChange={handleChange}
          />
          <br/>
          <button className="button" type="submit">Login</button>
          <br/>
        </form>

        <button className="button" onClick = {() => {navigate('/');}}>Torna
        </button>
        <button className="button"><Link to="/">TornaLink</Link>
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