//import React from "react";

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
import './App.css'; 
import { ClinicsPage } from "./pages/ClinicsPage";
import { ClinicsFormPage } from "./pages/ClinicsFormPage";
import { Navigation } from "./components/Navigation";
import logo from "./logos/logo.png";

function App() {
  return (
    <BrowserRouter>
    <Navigation/>
    <Routes>
      <Route path="/" element={<ClinicsPage />}/>
      <Route path="/clinics" element={<ClinicsPage />}/>
      <Route path="/clinics-creacio" element={<ClinicsFormPage />}/>
    </Routes>
</BrowserRouter>
  );
}
export default App;