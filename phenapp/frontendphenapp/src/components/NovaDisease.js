import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BrowserRouter, Route, Routes, useNavigate, useLocation, useHistory, useParams } from "react-router-dom";
import Header from "./Header";

function NovaMalaltia() {
    // es modifica cada cop que canvia el valor del camp
    const navigate = useNavigate();
    const location = useLocation();
    const clinic = location.state?.clinic; 
    const id = location.state?.pacient; 
    const idclinic = location.state?.idclinic;
    console.log("el id del pacient  a nava disease és:")
    console.log(id)
    console.log("el id del clínic a crear pacient és:")
    console.log(idclinic)  //el nom del clínic és correcte
      
    const [inputs, setInputs] = useState({
        nom:"",
        codi:"",
      });
    //const [mostrar, setMostrar] = useState(false);
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
    
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8000/api/malalties/', {
        codiMalaltia: inputs.codi,
        nomMalaltia: inputs.nom,
        nomclinic: clinic,
        clinic: idclinic,
        pacient: id,
      },
      {
        headers: {
            'Content-Type': 'application/json'  // Indicar que és JSON
        }
      })
      .then(response => {
        console.log("hola")
        console.log(response.data);
        console.log(idclinic);
        console.log(clinic);
        console.log("aquests han estat les dades del clínicdx")
        navigate('/pages/InicialClinic', { state: { 
                          id: idclinic,
                          nom: clinic } });
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
            Afegeix la nova malaltia
          </p>
          <form onSubmit={handleSubmit}>
            <label>Codi:</label>
            <input type="text" id="codiMalaltia"
              name="codi" onChange={handleChange}
            />
            <br/>
            <label>Nom de la malaltia:</label>
            <input type="text" id="nomMalaltia" 
              name="nom" onChange={handleChange}
            />
            
            <br/>
            <button className="button" type="submit">Nova</button>
            <br/>
          </form>
  
          <button className="button" onClick = {() => {
            navigate('/pages/InfoPacient');
          }}>Torna
          </button>
        </main>
      </div>
    );
  }
  export default NovaMalaltia;