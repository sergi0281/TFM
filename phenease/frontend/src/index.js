import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from "./pages/Login"; 
import Register from "./pages/Register";  
//import RegisterOK from "./components/RegisterOK";  
import InfoPacient from "./pages/InfoPacient";  
import InicialClinic from "./pages/InicialClinic";
import reportWebVitals from './reportWebVitals';
//import NouPacient from './components/NouPacient';
//import ConfirmacioDelPac from './components/ConfirmacioDelPac';
//import Malalties from './components/Malalties';
//import Termes from './components/Termes'
import NouTerme from './components/NouTerme';
//import NovaDisease from './components/NovaDisease';
import GenPredit from './components/GenPredit';

import { BrowserRouter, Routes, Route }  from "react-router-dom";
import { OntologiaProvider } from './OntologiaContext';   

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <OntologiaProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/pages/Login" element={<Login />} />
      <Route path="/pages/Register" element={<Register />} />
      <Route path="/pages/InicialClinic" element={<InicialClinic />} />
      <Route path="/pages/InfoPacient" element={<InfoPacient />} />
      <Route path="/components/NouTerme" element={<NouTerme />} />
      <Route path="/components/GenPredit" element={<GenPredit />} />
    </Routes>
  </BrowserRouter>
  </OntologiaProvider>
  //</React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
