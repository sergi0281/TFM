//import React from "react";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios';

function Login() {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
      nom:"",
      password:"",
  });
  
  // es modifica cada cop que canvia el valor del camp
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios.post('http://localhost:8000/api/clinics/login/', {
        nom: inputs.nom,
        password: inputs.password,
    },
    {
      headers: {
          'Content-Type': 'application/json'  
      }
    })
    .then(response => {
      console.log(response.data);  
      const idclinic = response.data.user.id; 
      
      navigate('/pages/InicialClinic', { state: { 
                    nom: inputs.nom,
                    id: idclinic } });
    
    })
    .catch(error => {
      console.error('Error obtenint usuari:', error);
    });
  }
  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <div className="App-principal">
          <h1>Benvingut a phenapp!</h1>  
        </div>
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
            name="password"
            value={inputs.password || ""} 
            onChange={handleChange}
          />
          <label>Mail:</label>
          <input type="text" id="inputMail" 
            name="email"
            value={inputs.mail || ""} 
            onChange={handleChange}
          />
          <br/>
          <button className="button" type="submit">Login</button>
          <br/>
        </form>

        <button className="button" onClick = {() => {navigate('/');}}>Torna
        </button>
        </main>
    </div>
  );
}
export default Login;