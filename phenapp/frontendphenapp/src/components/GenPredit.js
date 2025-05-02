import tancar from "../logos/cerrar.png";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
function GenPredit(props){ 
    const [gens, setGens] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    //const id = location.state?.id;
    const caracteristiques = location.state?.caracteristiques;
    console.log("les característiques són")
    console.log(caracteristiques)
    
    useEffect(() => {
        //console.log("el id del pacient al useEffect de prediccció")
        //console.log(id)
        if (caracteristiques && caracteristiques.length > 0) {
            axios.post('http://localhost:8000/api/predir_gen/', 
            {
                caracteristiques: caracteristiques
            },
            {
                headers: {
                    'Content-Type': 'application/json',  // Indicar que és JSON
                    //'Authorization': 'Bearer' 
                }
            })
            .then(response => {
                console.log("response.data")
                console.log("gens rebuts: ", response.data);
                setGens(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error obtenint gens:', error);
            });
        //    }
        }
        },[caracteristiques]); //aquí es tanca el useEffect
    return(
    <div className="termes">
        <div>
            <header >
                <div className="App-header">
                    <p> Gen predit: </p>
                    <p>
                    </p>
                </div>
            </header>
        </div>
        <div>
            <main >
                <div>
                <p><b>Característiques:</b></p>
                    
                </div>
                <div>
                   
                </div>
            </main>
        </div>
    </div>
    )
}
export default GenPredit;
      