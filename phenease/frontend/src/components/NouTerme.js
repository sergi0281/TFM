import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import OntologiaContext from '../OntologiaContext';  // Importa el context on tens l'ontologia

function NouTerme() {
    // es modifica cada cop que canvia el valor del camp
    const navigate = useNavigate();
    const location = useLocation();
    const { idclinic, clinic, id, codi, caracteristiques, gen, malaltia } = location.state || {};
    const { ontologia, loading } = useContext(OntologiaContext);  // Obtenim l'ontologia del context

    const [inputValue, setInputValue] = useState('');
    const [codiTerme, setCodiTerme] = useState('');
    const [suggeriments, setSuggeriments] = useState([]);
    const [nomTerme, setNomTerme] = useState('');
    
    if (loading) {
      return <p>Carregant ontologia...</p>;
    }
    
    const primerTerme = ontologia[0];
    const segonTerme = ontologia[19480];
    
    const handleInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);
    
      console.log("entro al handle InputChange")
      console.log(value)
      //console.log(term)
      if (value.length >= 2) {
        const filtered = ontologia
            .filter((term) => {
              const termName = term.nom.toLowerCase().trim();
              const inputValue = value.toLowerCase().trim();
              console.log(`Buscant "${inputValue}" dins "${termName}"`);
              //console.log(term)
              term.nom.toLowerCase().includes(value.toLowerCase())
            }
            )
            .slice(0, 10)
            .map((term) => ({
              id: term.id,
              nom: term.nom,
            }));
        
        setSuggeriments(filtered);
      }

      const selectedTerm = ontologia.find(
        (term) => term.nom.toLowerCase() === value.toLowerCase()
      );

      if (selectedTerm) {
        handleSelect(selectedTerm.nom);
      }
    };

    const handleSelect = (nom) => {
      setInputValue(nom);
      const selected = ontologia.find((term) => term.nom === nom);
      if (selected) {
        setCodiTerme(selected.id);
        setNomTerme(selected.nom)
        console.log("Seleccionat:", selected);
      }
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("codiTerme:", codiTerme);
      console.log("nomTerme:", nomTerme);
      //he de treure aquesta clau, activar el blog de l'axios per afegir el terme
      // i tancar-lo abans del response  

        axios.post('http://localhost:8000/api/afegir_terme/', {
            codiTerme: codiTerme,
            nomTerme: nomTerme,
            clinic: clinic,
            idclinic: idclinic,
            id: id,
            codi: codi,
            gen: gen,
            malaltia: malaltia,
        },
        {
            headers: {
              'Content-Type': 'application/json'  // Indicar que és JSON
          }
        },
      ) //aquí es tanca el axios post
      // la resposta que ens arriba conté el pacient serialitzat
      .then(response => {
        console.log(response.data)
        console.log("inicio la resposta de afegri terme");
        const caracteristiquesr = response.data.caracteristiques;
        const idclinicr=response.data.clinic;
        const idr = response.data.id;
        const codir = response.data.codi_pacient;
        const nom_clinicr = response.data.nom_clinic;
        const genr = response.data.gen;
        const malaltiar = response.data.malaltia;
        console.log("el id clinic quan torno de afegir terme es")
        console.log(idclinicr)
        console.log(idr)
        console.log(codir)
        console.log(caracteristiquesr)
        console.log(nom_clinicr)
        console.log("fi de les dades de quan torno d'afegir terme")
        if (caracteristiques) {
           navigate('/pages/InfoPacient', 
              { state: { 
                idclinic: idclinicr,
                clinic: nom_clinicr,
                id: idr,
                codi: codir,
                caracteristiques: caracteristiquesr,
                gen: genr,
                malaltia: malaltiar,
              } 
            });
        } else {
            console.warn("Algunes dades falten, assegura't que totes les variables es carreguen correctament!");
        }
          
      }) //aquí es tanca el then
      .catch(error => {
          console.error('Error obtenint usuari:', error);
      });
    }
    return (
      <div className="App">
        <Header />
        <main className="App-main">
          <div>
            <strong>{primerTerme.id} </strong>: {primerTerme.nom}
            <strong>{segonTerme.id} </strong>: {segonTerme.nom}
          </div>
          <p>
            Afegeix el nou Terme
          </p>
          
          <form onSubmit={handleSubmit}>
            <label>Codi:</label>
            <input type="text" id="codiTerme"
              name="codi"  value={codiTerme} readOnly
            />
            <br/>
            <label>Nom del Terme:</label>
            <div>
              <input type="text" id="nomTerme" 
                name="nom" value={inputValue} onChange={handleInputChange} list="suggerimentList"
              />
              <datalist id="suggerimentsList">
                {suggeriments.map((term, idx) => (
                  <option key={idx} value={term.nom} />
                ))}
              </datalist>
              
            </div>
            <button className="button" type="submit">Nou</button>
              <br/>
            </form>

          <button className="button" onClick = {() => {
            navigate('/pages/InfoPacient'
              ,{ 
                state: {
                        clinic: clinic,
                        idclinic: idclinic,
                        id: id,
                        caracteristiques: caracteristiques,
                        codi: codi,
                    }
                }
          );}}>Torna
          </button>
        </main>
      </div>
    );
  }
  export default NouTerme;