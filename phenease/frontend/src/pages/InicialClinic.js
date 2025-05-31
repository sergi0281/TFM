import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Pacient from "../components/Pacient";
import NouPacient from "../components/NouPacient"
import GraficaBarres from "../components/GraficaBarres";
import PacientsPerGen from "../components/PacientsPerGen";
import axios from 'axios';
import HeaderLogat from "../components/HeaderLogat";

function InicialClinic(){
  const navigate = useNavigate()
  const location = useLocation();
  const nom = location.state?.nom; 
  const id = location.state?.id; 
  
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
        setPacients(response.data);
      })
      .catch(error => {
        console.error('Error obtenint usuari:', error);
      });
  },[]); //aquí es tanca el useEffect 

  
    return(
        <div className="App">
            <HeaderLogat nom={nom} />
            <div>
              <GraficaBarres idclinic={id} pacients={pacients} />
            </div>
             <button className="button" onClick = {() => {navigate('/components/NouPacient'
                    ,{
                        state: {
                            clinic: nom,
                            idclinic: id,
                        }
                    }
                    );}}>
                Afegir pacient
            </button> 
            <div>
              <h2> Pacients de {nom} </h2>
              {pacients.map((pacient, index) => (
                  <div key={pacient.id}>
                    <p>
                    <Pacient id={pacient.id} codi={pacient.codi_pacient} 
                    clinic={nom} caracteristiques={pacient.caracteristiques} 
                    idclinic={id} gen={pacient.gen} malaltia = {pacient.malaltia} />
                    </p>
                  </div>
                  
              ))}
            </div>
            <div>
              <PacientsPerGen idclinic={id} nomclinic={nom} pacients={pacients} />
            </div>
        </div>
    )
} export default InicialClinic;