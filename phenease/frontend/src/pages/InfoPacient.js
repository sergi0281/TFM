import { useLocation } from 'react-router-dom';
import { BrowserRouter, Route, Routes, useNavigate, useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import HeaderLogat from "../components/HeaderLogat";
import Footer from "../components/Footer";
import Termes from "../components/Termes";

function InfoPacient(){
    const navigate = useNavigate()
    const location = useLocation()
    const id = location.state?.id; 
    const codi = location.state?.codi;
    const clinic = location.state?.clinic;
    const idclinic = location.state?.idclinic;
    const caracteristiques = location.state?.caracteristiques;
    const malaltia = location.state?.malaltia;
    const gen = location.state?.gen;
    console.log("a info pacient tenim el següent idclinic")
    console.log(idclinic)
    
    const handleClick = (event) => {
        event.preventDefault();
        axios.delete('http://localhost:8000/api/accio_pacient/', {
            data: { id },
            headers: { 'Content-Type': 'application/json' }})
        .then(() => {
            navigate('/components/Confirmacio', {
                state: { 
                    clinic: clinic
                }
            });
        });
      }

    return(
    <div>
        <HeaderLogat nom={clinic}/>
        <div>
            <p> CODI PACIENT: {codi} </p>
        </div>
        <div className="termesmalalties">
            <p>{id}  {codi}  {clinic}  {idclinic}  {gen}  {malaltia}</p>  
            <Termes id={id} codi={codi} caracteristiques={caracteristiques} clinic={clinic} idclinic={idclinic} malaltia={malaltia} gen={gen} />  
        </div>   
        <div className="botonsInfoPacient">
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