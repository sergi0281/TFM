//import React from "react";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function RegisterOK() {
  const navigate = useNavigate()
  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <p>
          L'usuari s'ha registra correctament
        </p>
        <p>
          Benvingut a l'aplicació. Ara ja pot fer login 
        </p> 
        <button className="button" onClick = {() => {navigate('/');}}>Torna  
        </button> 
      </main>
      <Footer />
    </div>
  );
}
export default RegisterOK;