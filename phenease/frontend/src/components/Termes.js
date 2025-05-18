import tancar from "../logos/cerrar.png";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

function Termes(props){ 
    const [features, setFeatures] = useState([]);
    const navigate = useNavigate();
    const id = props.id;
    const codi = props.codi;
    const caracteristiques = props.caracteristiques;
    const clinic = props.clinic;
    const idclinic = props.idclinic;
    const gen = props.gen;
    const malaltia = props.malaltia;
    //console.log("entrem a termes i anem a operar mostrant nom i id del clínic");
    //console.log(id);  //id del pacient
    //console.log(clinic) //nom de clínic
    //console.log(idclinic) //id de clínic
    //console.log(caracteristiques);

    //quan s'inicia aquest component es llisten tots els temes que té el pacient concret
    useEffect(() => {
        console.log("el id del pacient al useEffect de termes")
        console.log(id)
        axios.get('http://localhost:8000/api/llistar_termes/', 
          {
            params: {idpacient: id}
          },
          {
            headers: {
                'Content-Type': 'application/json',  // Indicar que és JSON
                //'Authorization': 'Bearer' 
            }
          })
          .then(response => {
            //console.log("termes rebuts: ", response.data);
            setFeatures(response.data);
            //console.log(response.data);
          })
          .catch(error => {
            console.error('Error obtenint termes:', error);
          });
    //    }
        },[id]); //aquí es tanca el useEffect
        
        const handleDelete = (idterme) => {
            //event.preventDefault();
            axios.delete('http://localhost:8000/api/eliminar_terme/', {
                data: { id, idterme, clinic, idclinic },
                headers: { 'Content-Type': 'application/json' }})
            .then(() => {
                console.log("terme eliminat: "); 
                const novesCaracteristiques = caracteristiques.filter(c => c.id !== idterme);
                setFeatures(novesCaracteristiques);
                //està eliminant el terme però no navega fins a InfoPacient  
                navigate('/pages/InfoPacient', { 
                state: { 
                    clinic: clinic,
                    id: id,
                    idclinic: idclinic,
                    gen: gen,
                    caracteristiques: novesCaracteristiques,
                    malaltia: malaltia
                } });
                  
            })
            //.then(() => {
            //    console.log("terme eliminat: ");
            //    //navigate('/components/Confirmacio', {
                
            //});
        }
        
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
                <div className="caracteristiques">
                    <p><b>Característiques:</b></p>
                        {caracteristiques.map((carac, index) => (
                            <div className="terme">
                                <div className="terme1">
                                    <b>{carac.codi}</b>: {carac.nom}
                                </div>
                                <div className="terme2">
                                    <img src={tancar} className="App-tancar" alt="tancar" 
                                    onClick={() => handleDelete(carac.id)} />
                                </div>
                            </div>
                        ))}
                </div>    
            </main>
        </div>
        <div> 
            <div className="botons">
                <button className="button" onClick = {() => {navigate('/components/NouTerme'
                    ,{
                        state: {
                            clinic: clinic,
                            idclinic: idclinic,
                            id: id,
                            caracteristiques: caracteristiques,
                            codi: codi,
                            gen: gen,
                            malaltia: malaltia,
                        }
                    }
                    );}}>
                Afegir terme
                </button> 
                <button className="button" onClick = {() => {navigate('/components/GenPredit'
                    ,{ 
                    state: {
                            clinic: clinic,
                            idclinic: idclinic,
                            id: id,
                            caracteristiques: caracteristiques,
                            codi: codi,
                            gen: gen,
                            malaltia: malaltia,
                        }
                    }
                    );}}>
                Predicció
                </button>   
            </div>
        </div>
    </div>
    )
}
export default Termes;
