
import { useNavigate } from "react-router-dom";
function Main(){ 
    const navigate = useNavigate()
    return(
        <main className="App-main">
        <div className="App-principal">
          <h1>Benvingut a phenapp!</h1>  
        </div>
        <p>
          Phenapp és un pàgina que permet a un clínic introduir termes de HPO
        </p>    
        <p>
          Pots iniciar sessió o registrar-te si encara no ho has fet
        </p>
        
        <button className="button" onClick = {() => {navigate('./pages/Login');}}>Login
        </button>
        <button className="button" onClick = {() => {navigate('./pages/Register');}}>Register
        </button>
      </main>
    )
}
export default Main;