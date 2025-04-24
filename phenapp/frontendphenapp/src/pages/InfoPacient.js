import { useLocation } from 'react-router-dom';
import { BrowserRouter, Route, Routes, useNavigate, useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "../logos/logo.png";
import Hello from "../components/Hello";
import Pacient from "../components/Pacient";
import Sessio from "../components/Sessio";
import axios from 'axios';
import NouPacient from '../components/NouPacient';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Termes from "../components/Termes";
import Malalties from "../components/Malalties";

function InfoPacient(){
    const navigate = useNavigate()
    const location = useLocation()
    const id = location.state?.id; 
    const nom = location.state?.nom; 
    const cognom = location.state?.cognom;
    const codi = location.state?.codi;
    const clinic = location.state?.clinic;
    const idclinic = location.state?.idclinic;
    const caracteristiques = location.state?.caracteristiques;
    const malalties = location.state?.malalties;
    console.log("les dades del pacient a infopacient són")
    console.log(id)
    console.log(nom)
    console.log(cognom)
    console.log("més dades")
    console.log(codi)
    console.log(clinic)  //arriba el nom del clínic
    console.log(idclinic)
    //console.log({caracteristiques})
    console.log("fi de les dades del pacient")
    //console.log(malalties)

    const handleClick = (event) => {
        event.preventDefault();
        axios.delete('http://localhost:8000/api/accio_pacient/', {
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
        <Header />
        <div>
            <p> NOM PACIENT: {nom} </p>
            <p> COGNOM PACIENT: {cognom} </p>
            <p> CODI PACIENT: {codi} </p>
        </div>
        <div>
            <Termes id={id} caracteristiques={caracteristiques} clinic={clinic} idclinic={idclinic} />
            <Malalties id={id} malalties={malalties} clinic={clinic} idclinic={idclinic}/>
        </div>
        <div>
            <button className="button" onClick = {() => {navigate('/pages/InicialClinic',
                {
                    state: {
                    nom: clinic,
                    id: idclinic
                    }
                }
            );}}>Torna    
            </button>
            <button className="button" onClick = {handleClick}>
                Eliminar pacient    
            </button>
        </div>
        <Footer />
    </div>
    )
} export default InfoPacient;