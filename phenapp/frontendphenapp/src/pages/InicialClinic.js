import { useLocation } from 'react-router-dom';
import { BrowserRouter, Route, Routes, useNavigate, useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import logo from "../logos/logo.png";
import carpetanegra from "../logos/carpetanegra.png";
import usuari from "../logos/usuari.png";
import Hello from "../components/Hello";
import Pacient from "../components/Pacient";
import Logo from "../components/Logo";
import Sessio from "../components/Sessio";
import GraficaBarres from "../components/GraficaBarres";
import PacientsPerGen from "../components/PacientsPerGen";
import TretsComuns from "../components/TretsComuns";
import axios from 'axios';
import NouPacient from '../components/NouPacient';
import HeaderLogat from "../components/HeaderLogat";

function InicialClinic(){
  const navigate = useNavigate()
  const location = useLocation();
  const nom = location.state?.nom; 
  const id = location.state?.id; 
  
  //<GraficaBarres idclinic={id} pacients={pacients} />
  //<TretsComuns idclinic={id} pacients={pacients} />
  //<PacientsPerGen idclinic={id} pacients={pacients}/>
  const [pacients, setPacients] = useState([]);
  
  useEffect(() => {
    axios.post('http://localhost:8000/api/pacients/', 
      {
        id: id,
        nom: nom,
      },
      {
        headers: {
            'Content-Type': 'application/json',  
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
  },[]); //aquí es tanca el useEffect 

    return(
        <div className="App">
            <HeaderLogat nom={nom} />
            <GraficaBarres idclinic={id} pacients={pacients} />
            <TretsComuns idclinic={id} pacients={pacients} />
            <div>
              <h1>Pacients de {nom}</h1>
                {pacients.map((pacient, index) => (
                  <div key={pacient.id}>
                    <Pacient id={pacient.id} codi={pacient.codi_pacient} 
                    clinic={nom} caracteristiques={pacient.caracteristiques} 
                    idclinic={id} gen={pacient.gen} malaltia = {pacient.malaltia} />
                  </div>
              ))}
            </div>
            <div>
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
          </div>
    )
} export default InicialClinic;