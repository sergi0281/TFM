import Clinics from "./Clinics";
import logo from "../logos/logo.png";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react"; //amb el useState mostraré les variables
//import {getClinics} from "./Clinicsapi"
import './ClinicsPage.css'; 

function ClinicsPage(){
    const navigate = useNavigate()
    const [clinics, setClinics] = useState([])
    //el useEffect s'executa quan carrega la pàgina; es crida a mostraClinics i mostraClinics crida
    //a getClinics
    useEffect(()=>{
        console.log("pagina carregada"); //ens ho mostra a la consola de la inspecció de pàgina
        //diem que la funció és asíncrona perquè es pot fer en segon pla i posem el await
         
        async function mostraClinics(){
            const res = await getClinics()
            console.log(res)
            setClinics(res.data)
        }
        mostraClinics();
    },[])
    return(
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="App-principal">
                  <h1>Benvingut a phenapp!</h1>  
                </div> 
            </header>
            <main>
                <div className="containerClinics">
                    {clinics.map(usuariclinic => (
                        <div key={usuariclinic.id} className="estilClinic">   
                            <Clinics text={usuariclinic.nom}/>
                        </div>
                    ))}
                </div>
                <button className="button" onClick = {() => {navigate('/');}}>Torna
                </button>
            </main>
        </div>
    )
} 

export default ClinicsPage;