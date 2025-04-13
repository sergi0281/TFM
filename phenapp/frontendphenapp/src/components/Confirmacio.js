import { Link, useNavigate, useLocation, useHistory, useParams } from "react-router-dom";

function Confirmacio(){
    const location = useLocation();
    const navigate = useNavigate();
    const nom = location.state?.nom; 
    const clinic = location.state?.clinic;
    return (
        <div>
            <div>
                <p> EL pacient {nom} de clínic {clinic} ha estat eliminat correctament </p>
            </div>
            <button className="button" onClick = {() => {navigate('/pages/InicialClinic',
                {
                    state: {
                    nom: clinic
                    }
                }
            );}}>Torna    
            </button>
        </div>
    )
}

export default Confirmacio;