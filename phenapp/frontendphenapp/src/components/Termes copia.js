import tancar from "../logos/cerrar.png";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
function Termes(){ 
    const [features, setFeatures] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state?.id; 
    const caracteristiques = location.state?.caracteristiques;
    const clinic = location.state?.clinic;
    const idclinic = location.state?.idclinic;
    console.log("entrem a termes i tenim");
    console.log(id);  //id del pacient
    console.log(caracteristiques);
    console.log(clinic) //nom de clínic
    console.log(idclinic) //id de clínic

    const handleDelete = (idterme) => {
        //event.preventDefault();
        axios.delete('http://localhost:8000/api/termes/', {
            data: { id, idterme, clinic, idclinic },
            headers: { 'Content-Type': 'application/json' }})
        .then(() => {
            navigate('/components/Confirmacio', {
                state: { 
                    id: id,
                    caracteristiques: caracteristiques,
                    clinic: clinic,
                    idcinic: idclinic
                }
            });
        });
    }
    //    }); //aquí es tanca el useEffect

    const handleClick = (event) => {
        event.preventDefault();
    //useEffect(() => {
        axios.post('http://localhost:8000/api/termes/', 
          {
            id: id,
            caracteristiques: caracteristiques ,
            clinic: clinic,
            idclinic: idclinic,
          },
          {
            headers: {
                'Content-Type': 'application/json',  // Indicar que és JSON
                //'Authorization': 'Bearer' 
            }
          })
          .then(response => {
            console.log("pacients rebuts: ", response.data)
            setFeatures(response.data);
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error obtenint usuari:', error);
          });
        }
    //    }); //aquí es tanca el useEffect
    return(
    <div className="termes">
        <div>
            <header >
                <div className="App-header">
                    <p> Termes fenotípics del pacient: </p>
                </div>
            </header>
        </div>
        <div>
            <main >
                <div>
                <p><b>Característiques:</b></p>
                    <ul>
                        {caracteristiques.map((carac, index) => (
                        <li key={index}>
                            <b>{carac.codi}</b>: {carac.nom}
                            <img src={tancar} className="App-tancar" alt="tancar" 
                            onClick={() => handleDelete(carac.id)} />
                        </li>
                    ))}
                    </ul>
                </div>
                <div>
                <button className="button" onClick = {() => {navigate('/components/NouTerme'
                    ,{
                        state: {
                            clinic: clinic,
                            idclinic: idclinic,
                            pacient: id,
                        }
                    }
                    );}}>
                Afegir terme
                </button>    
                </div>
            </main>
        </div>
    </div>
    )
}
export default Termes;
      