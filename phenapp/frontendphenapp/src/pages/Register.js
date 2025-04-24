//import React from "react";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios';

function Register() {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    nom:"",
    password:"",
    email:"",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    //const name = event.target.nom.value;
    //const password = event.target.pass.value;
    // a name i password tinc les coses que ha introduït l'usuari
    console.log(inputs.nom);
    console.log(inputs.password);
    console.log(inputs.email);
    axios.post('http://localhost:8000/api/clinics/register/', {
        nom: inputs.nom,
        password: inputs.password,
        email: inputs.email,
    
      },
      {
        headers: {
            'Content-Type': 'application/json'  // Indicar que és JSON
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error obtenint usuari:', error);
      });
  }
  return (
    <div className="App">
      <Header />
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
          <input type="text" id="inputPass" name="password"
            placeholder="Introdueix el password" onChange={handleChange} > 
          </input>
          <br/>
          <label>Correu:</label>
          <input type="text" id="inputMail" name="email"
            placeholder="Introdueix el mail" onChange={handleChange} > 
          </input>
          <br/>
          <button className="button" type="submit" onClick = {() => {navigate('/components/RegisterOK');}}>Registre</button>
          <button className="button" onClick = {() => {navigate('/');}}>Torna
          </button> 
        </form>
      </main>
      <Footer />
    </div>
  );
}
export default Register;