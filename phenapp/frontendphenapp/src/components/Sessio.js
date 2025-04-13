import './Pacient.css'; 
import user from "../logos/user.png";

function Sessio(props){
    return (
        <div className="App-sessio">
            <p className="pacient">Benvigut doctor {props.nom} {props.cognom}</p>
            <div><img src={user} className="App-user" alt="user" /></div>
        </div>

    )
}
export default Sessio;