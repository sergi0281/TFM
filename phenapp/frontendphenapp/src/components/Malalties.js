import Logo from "./Logo";
import LoginRegistre from "./LoginRegistre";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

function Malalties(){ 
    const [diseases, setDiseases] = useState([]);
    const location = useLocation()
    const navigate = useNavigate()
    const id = location.state?.id; 
    const malalties = location.state?.malalties;
    const clinic = location.state?.clinic;
    const idclinic = location.state?.idclinic;
    console.log(clinic)
    console.log("el id del pacient a malalties és:")
    console.log(id)
    const handleClick = (event) => {
        event.preventDefault();
    //useEffect(() => {
        axios.post('http://localhost:8000/api/malalties/', 
          {
            id: id,
            malalties: malalties ,
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
            setDiseases(response.data);
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error obtenint usuari:', error);
          });
    }
    //    }); //aquí es tanca el useEffect
    return(
    <div className="malalties">
        <div>
            <header >
                <div className="App-header">
                    <p> Malalties del pacient: </p>
                </div>
            </header>
        </div>
        <div>
            <main >
                <div className="App-principal">
                <p><b>Malalties:</b></p>
                    <ul>
                        {malalties.map((malaltia, index) => (
                        <li key={index}>
                            <b>{malaltia.codi}</b>: {malaltia.nom}
                        </li>
                    ))}
                    </ul>
                </div>
                <div>
                <button className="button" onClick = {() => {navigate('/components/NovaDisease'
                    ,{
                        state: {
                            clinic: clinic,
                            idclinic: idclinic,
                            pacient : id,
                        }
                    }
                    );}}>
                Afegir Maaltia
                </button>    
                </div>
            </main>
        </div>
    </div>
    )
}
export default Malalties;