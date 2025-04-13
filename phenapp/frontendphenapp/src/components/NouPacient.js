import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BrowserRouter, Route, Routes, useNavigate, useLocation, useHistory, useParams } from "react-router-dom";

function NouPacient() {
    // es modifica cada cop que canvia el valor del camp
    const navigate = useNavigate();
    const location = useLocation();
    const nomclinic = location.state?.nom; 
    const idclinic = location.state?.id;
    console.log("el nom del clínic a crear pacient és:")
    console.log(nomclinic)  //el nom del clínic és correcte
      
    const [inputs, setInputs] = useState({
        nom:"",
      });
    //const [mostrar, setMostrar] = useState(false);
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
    
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8000/api/afegir_pacient/', {
          nom: inputs.nom,
          cognom: inputs.cognom,
          codi_pacient: inputs.codi,
          dni: inputs.dni,
          sexe: inputs.sexe,
          clinic: idclinic,
      },
      {
        headers: {
            'Content-Type': 'application/json'  // Indicar que és JSON
        }
      })
      .then(response => {
        console.log("hola")
        console.log(response.data);
        navigate('/pages/InicialClinic', { state: { 
                          id: idclinic,
                          nom: nomclinic } });
      })
      .catch(error => {
        console.error('Error obtenint usuari:', error);
      });
    }
    return (
      <div className="App">
        <main className="App-main">
          <p>
            Afegeix el nou Pacient
          </p>
          <form onSubmit={handleSubmit}>
            <label>Nom:</label>
            <input type="text" id="inputNom"
              name="nom" onChange={handleChange}
            />
            <br/>
            <label>Cognom:</label>
            <input type="text" id="inputCognom" 
              name="cognom" onChange={handleChange}
            />
            <label>Codi:</label>
            <input type="text" id="inputCodi" 
              name="codi" onChange={handleChange}
            />
            <label>DNI:</label>
            <input type="text" id="inputDNI" 
              name="dni" onChange={handleChange}
            />
            <label>Sexe:</label>
            <input type="text" id="inputSexe" 
              name="sexe" onChange={handleChange}
            />
            <br/>
            <button className="button" type="submit">Nou</button>
            <br/>
          </form>
  
          <button className="button" onClick = {() => {navigate('/');}}>Torna
          </button>
        </main>
      </div>
    );
  }
  export default NouPacient;