
import { Link, useNavigate, useHistory, useParams } from "react-router-dom";
import carpetanegra from "../logos/carpetanegra.png";
import usuari from "../logos/usuari.png";

function Pacient(props){
    const navigate = useNavigate()
    return (
        <div>
            <button className="button" onClick = {() => {navigate('/pages/InfoPacient'
                    ,{
                        state: {
                          id: props.id,
                          codi: props.codi,
                          clinic: props.clinic,
                          idclinic: props.idclinic,
                          caracteristiques: props.caracteristiques,
                          gen: props.gen,
                          malaltia: props.malaltia
                        }
                    }
                    );}}>
                +
            </button>
            <b> PACIENT:  </b>{props.codi} 
            <b>    GEN:  </b>{props.gen} 
            <b>    MALALTIA:  </b>{props.malaltia}
        </div>
    )
}

export default Pacient;