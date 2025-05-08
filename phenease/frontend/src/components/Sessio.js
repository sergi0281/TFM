
import user from "../logos/user.png";

function Sessio(props){
    return (
        <div className="App-logreg">
            <div>
                <p> Doctor {props.nom} </p>
                <img src={user} className="App-user" alt="user" />
            </div> 
            
        </div>

    )
}
export default Sessio;