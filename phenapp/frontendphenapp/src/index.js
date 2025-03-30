import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from "./pages/Login"; 
import Register from "./pages/Register";  
import RegisterOK from "./pages/RegisterOK";  
import Pacients from "./pages/Pacients";  
import Termes from "./pages/Termes";
import ClinicsFormPage from "./pages/ClinicsFormPage";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route }  from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  // <App />   això anava a dins del BrowserRouter sol abans.
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/pages/Login" element={<Login />} />
      <Route path="/pages/Register" element={<Register />} />
      <Route path="/pages/RegisterOK" element={<RegisterOK />} />
      <Route path="/pages/Pacients" element={<Pacients />} />
      <Route path="/pages/Termes" element={<Termes />} />
      <Route path="/pages/ClinicsFormPage" element={<ClinicsFormPage />} />
    </Routes>
  </BrowserRouter>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();