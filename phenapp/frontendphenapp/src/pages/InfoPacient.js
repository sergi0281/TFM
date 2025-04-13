import { useLocation } from 'react-router-dom';
import { BrowserRouter, Route, Routes, useNavigate, useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "../logos/logo.png";
import Hello from "../components/Hello";
import Pacient from "../components/Pacient";
import Sessio from "../components/Sessio";
import axios from 'axios';
import NouPacient from '../components/NouPacient';

function InfoPacient(){
    const navigate = useNavigate()
    const location = useLocation()
    const id = location.state?.id; 
    const nom = location.state?.nom; 
    const cognom = location.state?.cognom;
    const codi = location.state?.codi;
    const clinic = location.state?.clinic;
    console.log("les dades del pacient són")
    console.log(id)
    console.log(nom)
    console.log(cognom)
    console.log(codi)
    console.log(clinic)

    const handleClick = (event) => {
        event.preventDefault();
        axios.delete('http://localhost:8000/api/afegir_pacient/', {
            data: { id },
            headers: { 'Content-Type': 'application/json' }})
        .then(() => {
            navigate('/components/Confirmacio', {
                state: { 
                    nom: nom,
                    cognom: cognom,
                    clinic: clinic
                }
            });
        });
      }

    return(
    <div>
        <div>
            <p> Aquí tindrem el pacient i la seva informació destacada </p>
        </div>
        <button className="button" onClick = {() => {navigate('/pages/InicialClinic',
            {
                state: {
                  nom: clinic
                }
            }
        );}}>Torna    
        </button>
        <button className="button" onClick = {handleClick}>
            Eliminar pacient    
        </button>
    </div>
    )
} export default InfoPacient;