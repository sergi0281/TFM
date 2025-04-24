import { Link, useNavigate, useLocation, useHistory, useParams } from "react-router-dom";
import Header from "../components/Header";

function Confirmacio(){
    const location = useLocation();
    const navigate = useNavigate();
    const nom = location.state?.nom; 
    const clinic = location.state?.clinic;
    //const idclinic = location.state?.idclinic;
    console.log("id del clínic")
    console.log(clinic)
    //console.log(idclinic)
    return (
        <div>
            <Header />
            <div>
                <p> EL pacient {nom} de clínic {clinic} ha estat eliminat correctament </p>
            </div>
            <button className="button" onClick = {() => {navigate('/pages/InicialClinic',
                {
                    state: {
                    nom: clinic,
                    id: clinic,
                    }
                }
            );}}>Torna    
            </button>
        </div>
    )
}

export default Confirmacio;