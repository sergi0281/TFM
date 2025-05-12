import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
//import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
//import logo from "../logos/logo.png";
//import carpetanegra from "../logos/carpetanegra.png";
//import usuari from "../logos/usuari.png";
import Pacient from "../components/Pacient";
//import Logo from "../components/Logo";
//import Sessio from "../components/Sessio";
import GraficaBarres from "../components/GraficaBarres";
import PacientsPerGen from "../components/PacientsPerGen";
//import TretsComuns from "../components/TretsComuns";
import axios from 'axios';
import HeaderLogat from "../components/HeaderLogat";

function InicialClinic(){
  const navigate = useNavigate()
  const location = useLocation();
  const nom = location.state?.nom; 
  const id = location.state?.id; 
  console.log("a inicialClinic tinc")
  console.log(id)
  console.log(nom)
  
  //<GraficaBarres idclinic={id} pacients={pacients} />
  //<TretsComuns idclinic={id} pacients={pacients} />
  //<PacientsPerGen idclinic={id} pacients={pacients}/>
  const [pacients, setPacients] = useState([]);
  
  //useEffect(() => {
  //  axios.get(`http://localhost:8000/api/pacients/?idclinic=${id}`)
  //    .then(res => setPacients(res.data))
  //    .catch(err => console.error(err));
  //}, []);

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
            <div>
              <p> ets el clinic {nom} amb el id {id}</p>
              <p> la teva gràfica de pacients és</p>
              <GraficaBarres idclinic={id} pacients={pacients} />
            </div>
            <div>
              <h1> Pacients de {nom} agrupats per gen </h1>
              {pacients.map((pacient, index) => (
                  <div key={pacient.id}>
                    <p>{pacient.codi_pacient}  {pacient.gen}  {pacient.malaltia}</p>
                    <Pacient id={pacient.id} codi={pacient.codi_pacient} 
                    clinic={nom} caracteristiques={pacient.caracteristiques} 
                    idclinic={id} gen={pacient.gen} malaltia = {pacient.malaltia} />
                  </div>
                  
              ))}
            </div>
            <div>
              <PacientsPerGen idclinic={id} nomclinic={nom} pacients={pacients} />
            </div>
        </div>
    )
} export default InicialClinic;