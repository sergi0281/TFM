import './Pacient.css'; 
import { Link, useNavigate, useHistory, useParams } from "react-router-dom";

function Pacient(props){
    console.log("a pacient dades del pacient")
    console.log(props.id)    
    const navigate = useNavigate()
    return (
        <div className="pacientCarpeta">
            <p><b>NOM:</b>{props.nom}</p>
            <p><b>COGNOM:</b>{props.cognom}</p>
            <p><b>CODI:</b>{props.codi}</p>
            <p><b>CLINIC:</b>{props.clinic}</p>
            <button className="button" onClick = {() => {navigate('/pages/InfoPacient'
                    ,{
                        state: {
                          id: props.id,
                          nom: props.nom,
                          cognom: props.cognom,
                          codi: props.codi,
                          clinic: props.clinic
                        }
                    }
                    );}}>
                Més informació del pacient
            </button>
            
        </div>

    )
}

export default Pacient;