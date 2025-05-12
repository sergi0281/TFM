import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const OntologiaContext = createContext();

export const OntologiaProvider = ({ children }) => {
  const [ontologia, setOntologia] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarOntologiaGlobal = async () => {
      try {
        //const res = await axios.get('/api/ontologia/');
        const res = await axios.get('http://localhost:8000/api/ontologia/');
        setOntologia(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error carregant la ontologia:', err);
        setLoading(false);
      }
    };

    carregarOntologiaGlobal(); 
  }, []); 

  return (
    <OntologiaContext.Provider value={{ ontologia, loading }}>
      {children}  
    </OntologiaContext.Provider>
  );
};

export default OntologiaContext;