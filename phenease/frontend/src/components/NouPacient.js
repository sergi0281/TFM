import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import OntologiaContext from '../OntologiaContext'; 

function NouPacient() {
  const navigate = useNavigate()
  const location = useLocation();
  const id = location.state?.idclinic; 
  const nom = location.state?.clinic
  console.log("el id del clinic es")
  console.log(id)
  console.log("el nom del clinic es")
  console.log(nom)
  const [inputCodi, setInputCodi] = useState('');
  const [inputSexe, setInputSexe] = useState('');
  const [inputGen, setInputGen] = useState('');
  const [inputMalaltia, setInputMalaltia] = useState('');
  
  const handleCodiChange = (e) => {
      const value = e.target.value;
      setInputCodi(value);
  }
  const handleSexeChange = (e) => {
      const value = e.target.value;
      setInputSexe(value);
  }
  const handleMalaltiaChange = (e) => {
      const value = e.target.value;
      setInputMalaltia(value);
  }
  const handleGenChange = (e) => {
      const value = e.target.value;
      setInputGen(value);
  }
  const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8000/api/afegir_pacient/', {
            idclinic: id,
            codi: inputCodi,
            gen: inputGen,
            malaltia: inputMalaltia,
            sexe: inputSexe,
        },
        {
            headers: {
              'Content-Type': 'application/json'  // Indicar que és JSON
          }
        },
      ) //aquí es tanca el axios post
      // la resposta que ens arriba conté el pacient serialitzat
      .then(response => {
        const id = response.data.clinic;
        const nom=response.data.nom_clinic;
        
           navigate('/pages/InicialClinic', 
              { state: { 
                id: id,
                nom: nom,
              } 
            });    
      }) //aquí es tanca el then
      .catch(error => {
          console.error('Error obtenint usuari:', error);
      });
    }

return (
      <div className="App">
        <Header />
        <main className="App-main">
          <p>
            Afegeix el nou Terme
          </p>
          <form onSubmit={handleSubmit}>
            <label>Codi Pacient:</label>
            <input type="text" id="codiPacient"
              name="codi"  value={inputCodi} onChange={handleCodiChange}
            />
            <br/>
            <label>Sexe:</label>
            <input type="text" id="sexePacient"
              name="sexe"  value={inputSexe} onChange={handleSexeChange}
            />
            <br/>
            <label>Gen:</label>
            <div>
              <input type="text" id="genPacient" 
                name="gen" value={inputGen} onChange={handleGenChange}
              />  
            </div>
            <label>Malaltia:</label>
            <div>
              <input type="text" id="malaltiaPacient" 
                name="malaltia" value={inputMalaltia} onChange={handleMalaltiaChange}
              />  
            </div>
            <button className="button" type="submit">Nou Pacient</button>
              <br/>
            </form>
        </main>
      </div>
    );
}
export default NouPacient;