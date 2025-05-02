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
import axios from 'axios';
import NouPacient from '../components/NouPacient';
import Header from "../components/Header";

function InicialClinic(){
  const navigate = useNavigate()
  const location = useLocation();
  const nom = location.state?.nom; 
  const id = location.state?.id; 
  console.log("el nom i el id del clínic a inicial clínic és:")
  console.log(nom)
  console.log(id)
  const [pacients, setPacients] = useState([]);
  const [data, setData] = useState([]);
  const agruparPacients = (llista) => {
    return llista.reduce((acc, pacient) => {
      const gen = pacient.gen || 'Desconegut';
      if (!acc[gen]) acc[gen] = [];
      acc[gen].push(pacient);
      return acc;
    }, {});
  };

  const pacientsGen = agruparPacients(pacients);
  
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
  },[]); //aquí es tanca el useEffect 

  useEffect(() => {
    axios.get(`http://localhost:8000/api/gens_count/?idclinic=${id}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

    return(
        <div className="App">
            <Header />
            <div>
              <h2 className="text-xl font-semibold mb-4">Distribució de gens dels pacients</h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="gen" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#38bdf8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h1>Pacients de {nom}</h1>
                {pacients.map((pacient, index) => (
                  <div key={pacient.id}>
                    <Pacient id={pacient.id} nom={pacient.nom} cognom={pacient.cognom} codi={pacient.codi_pacient} 
                    clinic={nom} caracteristiques={pacient.caracteristiques} malalties={pacient.malalties}
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
            {Object.entries(pacientsGen).map(([gen, grup]) => (
            <div key={gen} >
              <h2>Gen: {gen} ({grup.length} pacients)</h2>
              {grup.map((pacient) => (
                <div key={pacient.id}>
                  <Pacient
                    id={pacient.id}
                    nom={pacient.nom}
                    cognom={pacient.cognom}
                    codi={pacient.codi_pacient}
                    clinic={nom}
                    caracteristiques={pacient.caracteristiques}
                    malalties={pacient.malalties}
                    idclinic={id}
                    gen={pacient.gen}
                    malaltia={pacient.malaltia}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
    )
} export default InicialClinic;