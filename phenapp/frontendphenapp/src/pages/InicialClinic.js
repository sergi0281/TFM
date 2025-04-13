import { useLocation } from 'react-router-dom';
import { BrowserRouter, Route, Routes, useNavigate, useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "../logos/logo.png";
import Hello from "../components/Hello";
import Pacient from "../components/Pacient";
import Sessio from "../components/Sessio";
import axios from 'axios';
import NouPacient from '../components/NouPacient';

function InicialClinic(){
  const navigate = useNavigate()
  const location = useLocation();
  const nom = location.state?.nom; 
  const id = location.state?.id; 
  console.log("el nom del clínic a inicial clínic és:")
  console.log(nom)
  const [pacients, setPacients] = useState([]);
  const [mostrar, setMostrar] = useState(false);
  const handleClick = () => {
    setMostrar(true);
  };
  useEffect(() => {
    axios.post('http://localhost:8000/api/pacients/', 
      {
        id: id,
        nom: nom,
      },
      {
        headers: {
            'Content-Type': 'application/json',  // Indicar que és JSON
            //'Authorization': 'Bearer' 
        }
      })
      .then(response => {
        console.log("pacients rebuts: ", response.data)
        setPacients(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error obtenint usuari:', error);
      });
    },[nom]); //aquí es tanca el useEffect 
    return(
        <div className="App">Formulari per clínics
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <div className="App-principal">
                <h1>Benvingut a phenapp!</h1>  
              </div>
              <div className="App-sessio">
                <Sessio nom={nom}/>  
              </div> 
            </header>
            <div>
                <Hello text={nom}/>
            </div>
            <div>
              <h1>Pacients de {nom}</h1>
                {pacients.map((pacient, index) => (
                  <div key={pacient.id}>
                    <Pacient id={pacient.id} nom={pacient.nom} cognom={pacient.cognom} codi={pacient.codi_pacient} clinic={nom} />
                  </div>
              ))}
            </div>
            <button className="button" onClick = {() => 
              {navigate('/components/NouPacient',{
                state: {
                  id: id,
                  nom: nom
                }
              });
              }}>Nou Pacient

            </button>
            <button className="button" onClick = {() => {navigate('/');}}>HPOs
            </button>
        </div>
    )
} export default InicialClinic;