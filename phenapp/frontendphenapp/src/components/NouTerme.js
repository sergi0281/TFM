import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";

function NouTerme() {
    // es modifica cada cop que canvia el valor del camp
    const navigate = useNavigate();
    const location = useLocation();
    const { idclinic, clinic, id, nom, cognom, codi, caracteristiques, malalties } = location.state || {};
    //const nomclinic = location.state?.clinic; 
    //const idclinic = location.state?.idclinic;
    //const id = location.state?.id;
    //const nom = location.state?.nom;
    //const cognom = location.state?.cognom;
    console.log("es dades a nou terme és idclinic,nomclinic,idpacient:")
    console.log(idclinic) 
    console.log(clinic)
    console.log(id)
    console.log("caracgterístiques")
    console.log(caracteristiques)
    console.log("malalties")
    console.log(malalties)
    console.log("fina")
    
    //aquí comencem a posar les comandes per fer suggeriments
    const [termes, setTermes] = useState([]);
    const [inputValue, setInputValue] = useState('');
    //const [codiTerme, setCodiTerme] = useState('');
    const [suggeriments, setSuggeriments] = useState([]);
    const [codiTerme, setCodiTerme] = useState('');
    const [nomTerme, setNomTerme] = useState('');

    // Parser de fitxers .obo
    const parseOBO = (text) => {
      const blocks = text.split(/\n\[Term\]/g).map((b, i) => (i === 0 ? b : '[Term]' + b)).filter(Boolean);
      return blocks.map((block) => {
        const term = {};
        const lines = block.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('['));
        lines.forEach(line => {
          const match = line.match(/^(\w+):\s+(.*)$/);
          if (match) {
            const [, key, rawValue] = match;
            const value = rawValue.trim();
            if (!term[key]) term[key] = value;
            else if (Array.isArray(term[key])) term[key].push(value);
            else term[key] = [term[key], value];
          }
        });
        return term;
      });
    };

    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const parsedTerms = parseOBO(text);
        setTermes(parsedTerms);
      };
      reader.readAsText(file);
    };
    
    // Quan escrius al camp, busquem suggeriments
    const handleInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);
      setNomTerme(value);

      if (value.length >= 2) {
        const resultats = termes.filter(term =>
          term.name && term.name.toLowerCase().includes(value.toLowerCase())
        );
        setSuggeriments(resultats);
      } else {
        setSuggeriments([]);
      }
    };

    const handleSelect = (nom) => {
      const termeSeleccionat = suggeriments.find(t => t.name === nom);
      setInputValue(nom);
      setNomTerme(nom);
      //setCodiTerme(e.target.value)
      setCodiTerme(termeSeleccionat?.id || '');
      setSuggeriments([]);
    };
  
    const handleSubmitback = (e) => {
      e.preventDefault();
      console.log('Codi:', e.target.codi.value);
      console.log('Nom:', inputValue);
    };
  


    //fi del nou codi
    const [inputs, setInputs] = useState({
        nom:"",
        codi:"",
      });
    //const [mostrar, setMostrar] = useState(false);
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("codiTerme:", codiTerme);
      console.log("nomTerme:", nomTerme);
      
      axios.post('http://localhost:8000/api/afegir_terme/', {
          codiTerme: codiTerme,
          nomTerme: nomTerme,
          clinic: clinic,
          idclinic: idclinic,
          id: id,
      },
      {
        headers: {
            'Content-Type': 'application/json'  // Indicar que és JSON
        }
      },
      )
      .then(response => {
     
      if (caracteristiques && malalties) {
        navigate('/pages/InfoPacient', 
          { state: { 
            idclinic: idclinic,
            nom: clinic,
            id: id,
            nom: nom,
            cognom: cognom,
            codi: codi,
            caracteristiques: caracteristiques,
            malalties: malalties,
          } 
          });
      } else {
        console.warn("Algunes dades falten, assegura't que totes les variables es carreguen correctament!");
      }
        
      })
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
          <input type="file" accept=".obo,.txt" onChange={handleFileUpload} />

          <form onSubmit={handleSubmit}>
            <label>Codi:</label>
            <input type="text" id="codiTerme"
              name="codi" value={codiTerme}
              onChange={(e) => setCodiTerme(e.target.value)}
            />
            <br/>
            <label>Nom del Terme:</label>
            <input type="text" id="nomTerme" 
              name="nom" value={inputValue} onChange={handleInputChange}
            />
            <button className="button" type="submit">Nou</button>
            <br/>
          </form>
          {suggeriments.length > 0 && (
            <ul>
              {suggeriments.map((term,idx) => (
                <li 
                  key={idx}
                  onClick={()=>handleSelect(term.name)}
                >
                  {term.name}
                </li>
              ))}
            </ul>  
          )}

          <button className="button" onClick = {() => {
            navigate('/pages/InfoPacient');
          }}>Torna
          </button>
        </main>
      </div>
    );
  }
  export default NouTerme;