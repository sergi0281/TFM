import { Link, useNavigate, useLocation, useHistory, useParams } from "react-router-dom";
import Header from "./Header";

function ConfirmacioEliminarPacient(){
    const location = useLocation();
    const navigate = useNavigate();
    const nom = location.state?.nom; 
    const idclinic = location.state?.idclinic;
    const idpacient = location.state?.idpacient;
    //const idclinic = location.state?.idclinic;
    console.log("id del clínic")
    console.log(idclinic)
    //console.log(idclinic)
    return (
        <div>
            <Header />
            <div>
                <p> EL pacient {nom} de clínic {idclinic} ha estat eliminat correctament </p>
            </div>
            <button className="button" onClick = {() => {navigate('/pages/InicialClinic',
                {
                    state: {
                    nom: nom,
                    id: idclinic,
                    }
                }
            );}}>Torna    
            </button>
        </div>
    )
}

export default ConfirmacioEliminarPacient;