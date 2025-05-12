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
    //console.log("les dades a nou terme és idclinic,nomclinic,idpacient:")
    //console.log(id)
    //console.log(idclinic) 
    //console.log(clinic)
    //console.log(codi)
    //console.log(gen)
    //console.log(malaltia)
    //console.log(caracteristiques)
    
    const { ontologia, loading } = useContext(OntologiaContext);  // Obtenim l'ontologia del context

    // Si l'ontologia encara s'està carregant, mostrem un missatge
    
    //aquí comencem a posar les comandes per fer suggeriments
    //const [termes, setTermes] = useState([]);
    //const [ontologia, setOntologia] = useState([]);
    //const [loading, setLoading] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [codiTerme, setCodiTerme] = useState('');
    const [suggeriments, setSuggeriments] = useState([]);
    //const [codiTerme, setCodiTerme] = useState('');
    const [nomTerme, setNomTerme] = useState('');
    
    if (loading) {
      return <p>Carregant ontologia...</p>;
    }
    
    //el primer que es fa quan s'inicia el component NouTerme és carregar la ontologia
    //useEffect(() => {
      //axios.get('/api/termes/')
      //  .then(res => {
      //    setOntologia(res.data);
      //  })
      //  .catch(err => {
      //    console.error('Error carregant la ontologia:', err);
      //  });
      //console.log("vaig a carregar la ontologia desde nouterme")
      //const carregarOntologia = async () => {
      //  try {
      //    const res = await axios.get('/api/ontologia/');
      //    setOntologia(res.data);
      //  } catch (err) {
      // console.error('Error carregant la ontologia:', err);
      //  } finally {
      //    setLoading(false);
      //  }
      //};
  
      //carregarOntologia();  
    //}, []);
    const primerTerme = ontologia[0];
    const segonTerme = ontologia[1];
    //console.log(primerTerme)
    //console.log(segonTerme)

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

    // Quan escrius al camp, busquem suggeriments
    //const handleInputChange = (e) => {
    //  const value = e.target.value;
    //  setInputValue(value);
    //  setNomTerme(value);

    //  if (value.length >= 2) {
    //    const resultats = termes.filter(term =>
    //      term.name && term.name.toLowerCase().includes(value.toLowerCase())
    //    );
    //    setSuggeriments(resultats);
    //  } else {
    //    setSuggeriments([]);
    //  }
    //};

    const handleInputChange = (e) => {
      //if (!ontologia || loading || !inputValue) {
      //  setSuggeriments([]);
      //  return;
      //}
      const value = e.target.value;
      setInputValue(value);
    
      //console.log("entro al handle InputChange")
      //console.log(inputValue)
      //console.log(term)
      if (inputValue.length >= 2) {
        const filtered = ontologia
            .filter((term) =>
            //console.log(term)
            term.nom.toLowerCase().includes(inputValue.toLowerCase())
            )
            .slice(0, 10)
            .map((term) => ({
              id: term.id,
              nom: term.nom,
            }));
        setSuggeriments(filtered);
      }
    };

    const handleSelect = (nom) => {
      console.log(nom)
      const termeSeleccionat = suggeriments.find(t => t.nom === nom);
      console.log(termeSeleccionat)
      setInputValue(nom);
      setNomTerme(nom);
      setCodiTerme(termeSeleccionat?.id || '');
      setSuggeriments([]);
    };
    //const handleSelect = (term) => {
    //  setInputNom(term.nom);       // Mostra nom seleccionat al camp
    //  setInputCodi(term.codi);     // Actualitza l'altre camp
    //  setSuggeriments([]);         // Tanca suggeriments
    //};
  
    //const handleSubmitback = (e) => {
    //  e.preventDefault();
    //  console.log('Codi:', e.target.codi.value);
    //  console.log('Nom:', inputValue);
    //};
  
    //const [inputs, setInputs] = useState({
    //    nom:"",
    //    codi:"",
    //  });
    //const [mostrar, setMostrar] = useState(false);
    //const handleChange = (event) => {
    //  const name = event.target.name;
    //  const value = event.target.value;
    //  setInputs(values => ({...values, [name]: value}))
    //}
   
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("codiTerme:", codiTerme);
      console.log("nomTerme:", nomTerme);
    }  //he de treure aquesta clau, activar el blog de l'axios per afegir el terme
       // i tancar-lo abans del response  

    //  axios.post('http://localhost:8000/api/afegir_terme/', {
    //      codiTerme: codiTerme,
    //      nomTerme: nomTerme,
    //      clinic: clinic,
    //      idclinic: idclinic,
    //      id: id,
    //  },
    //  {
    //    headers: {
    //        'Content-Type': 'application/json'  // Indicar que és JSON
    //    }
    //  },
    //  )
    //  .then(response => {
    //  console.log("inicio la resposta de afegri terme");
      //const idclinicr=response.data.idclinic;
    // console.log(idclinic)
    //  const idr = response.data.id;
    //  const codir = response.data.codi_pacient;
    //  const caracteristiquesr = response.data.caracteristiques;
    //  const nom_clinic = response.data.nom_clinic;
    //  console.log("el id clinic quan torno de afegir terme es")
    //  console.log(idclinic)
    //  console.log(idr)
    //  console.log(codir)
    //  console.log(caracteristiquesr)
    //  console.log(nom_clinic)
    //  console.log("fi de les dades de quan torno d'afegir terme")
    //  if (caracteristiques) {
    //   navigate('/pages/InfoPacient', 
    //      { state: { 
    //        idclinic: idclinic,
    //        clinic: nom_clinic,
    //        id: idr,
    //        codi: codir,
    //        caracteristiques: caracteristiquesr,
    //        } 
    //      });
    //  } else {
    //    console.warn("Algunes dades falten, assegura't que totes les variables es carreguen correctament!");
    //  }
        
    //  })
    //  .catch(error => {
    //    console.error('Error obtenint usuari:', error);
    //  });
    //}
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
                name="nom" value={inputValue} onChange={handleInputChange}
              />
              
              {suggeriments.length > 0 && (
                <ul className="ulTermes">
                  {suggeriments.map((term, idx) => (
                    <li className="liTermes"
                      key={idx}
                      onClick={() => handleSelect(term.nom)}
                    >
                    {term.nom}
                    </li>
                  ))}
                </ul>  
              )}
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