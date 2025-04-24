
import { Link, useNavigate, useHistory, useParams } from "react-router-dom";
import carpetanegra from "../logos/carpetanegra.png";
import usuari from "../logos/usuari.png";

function Pacient(props){
    console.log("a pacient dades del pacient")
    console.log(props.id)  
    console.log("a pacient dades del clinic")
    console.log(props.idclinic)  
    console.log("les característiques del pacient són:")
    console.log(props.caracteristiques)  
    const navigate = useNavigate()
    return (
        <div className="pacientCarpeta">
            <div className="componentPacient"><img src={usuari} className="App-user" alt="user" /></div>
            <div className="componentPacient"><p><b>PACIENT:</b>{props.nom} {props.cognom}</p></div>
            <div className="componentPacient"><p><b>CODI:</b>{props.codi}</p></div>
            <div className="componentPacient"><img src={carpetanegra} className="App-user" alt="user" /></div>
            
            <button className="button" onClick = {() => {navigate('/pages/InfoPacient'
                    ,{
                        state: {
                          id: props.id,
                          nom: props.nom,
                          cognom: props.cognom,
                          codi: props.codi,
                          clinic: props.clinic,
                          idclinic: props.idclinic,
                          caracteristiques: props.caracteristiques,
                          malalties: props.malalties
                        }
                    }
                    );}}>
                Més informació del pacient
            </button>    
        </div>
    )
}

export default Pacient;