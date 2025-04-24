import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BrowserRouter, Route, Routes, useNavigate, useLocation, useHistory, useParams } from "react-router-dom";
import Header from "./Header";

function NouTerme() {
    // es modifica cada cop que canvia el valor del camp
    const navigate = useNavigate();
    const location = useLocation();
    const nomclinic = location.state?.clinic; 
    const idclinic = location.state?.idclinic;
    const id = location.state?.pacient;
    console.log("es dades a nou terme és és:")
    //console.log(idclinic) 
    console.log(nomclinic)
    console.log(id)
      
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
      axios.post('http://localhost:8000/api/termes/', {
          codiTerme: inputs.codi,
          nomTerme: inputs.nom,
          nomclinic: nomclinic,
          clinic: idclinic,
          pacient: id,
      },
      {
        headers: {
            'Content-Type': 'application/json'  // Indicar que és JSON
        }
      })
      .then(response => {
        console.log("hola a la resposta dels termes")
        console.log(response.data);
        const { clinic } = response.data;
        navigate('/components/Confirmacio', 
          { state: { 
            id: clinic,
            nom: nomclinic,
            //codiTerme,
            //nomTerme,
          } 
          });
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
            Afegeix el nou Terme
          </p>
          <form onSubmit={handleSubmit}>
            <label>Codi:</label>
            <input type="text" id="codiTerme"
              name="codi" onChange={handleChange}
            />
            <br/>
            <label>Nom del Terme:</label>
            <input type="text" id="nomTerme" 
              name="nom" onChange={handleChange}
            />
            <button className="button" type="submit">Nou</button>
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
  export default NouTerme;