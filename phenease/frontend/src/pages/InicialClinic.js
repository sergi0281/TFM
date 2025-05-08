import { useLocation } from 'react-router-dom';
import { BrowserRouter, Route, Routes, useNavigate, useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
//import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
//import logo from "../logos/logo.png";
//import carpetanegra from "../logos/carpetanegra.png";
//import usuari from "../logos/usuari.png";
//import Hello from "../components/Hello";
//import Pacient from "../components/Pacient";
//import Logo from "../components/Logo";
import Sessio from "../components/Sessio";
//import GraficaBarres from "../components/GraficaBarres";
//import PacientsPerGen from "../components/PacientsPerGen";
//import TretsComuns from "../components/TretsComuns";
import axios from 'axios';
//import NouPacient from '../components/NouPacient';
import HeaderLogat from "../components/HeaderLogat";

function InicialClinic(){
  const navigate = useNavigate()
  const location = useLocation();
  const nom = location.state?.nom; 
  const id = location.state?.id; 
  console.log("el nom i el id del clínic a inicial clínic és:")
  console.log(nom)
  console.log(id)
  
  //const [pacients, setPacients] = useState([]);
  
  //useEffect(() => {
  //  axios.post('http://localhost:8000/api/pacients/', 
  //    {
  //      id: id,
  //      nom: nom,
  //    },
  //    {
  //      headers: {
  //          'Content-Type': 'application/json',  // Indicar que és JSON
            //'Authorization': 'Bearer' 
  //      }
  //    })
  //    .then(response => {
  //      console.log("pacients rebuts: ", response.data)
  //      setPacients(response.data);
  //      console.log(response.data);
  //    })
  //    .catch(error => {
  //      console.error('Error obtenint usuari:', error);
  //    });
  //},[]); //aquí es tanca el useEffect 

    return(
        <div className="App">
            <HeaderLogat nom={nom} />
            <div>
              <p> ets el clinic {nom} amb el id {id}</p>
            </div>
        </div>
    )
} export default InicialClinic;