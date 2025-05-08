
import { useNavigate } from "react-router-dom";
function Main(){ 
    const navigate = useNavigate()
    return(
        <main className="App-main">
        <div className="App-principal">
          <h1>Benvingut a phenease, from phenotype to disease!</h1>  
        </div>
        <p>
          Phenease és un pàgina que permet a un clínic introduir 
          característiques fenotípiques de determimats pacients i a partir
          d'aquests trets fenotípics predir quin és el gen que està involucrat
          en les observacions realitzades
        </p>    
        <p>
          Pots iniciar sessió a l'aplicació o registrar-te si encara no ho has
          fet.
        </p>
        <p>
          Phenease utilitza les funcionalitats de olalla per tal de determinar
          el gen involucrat en la malaltia que pateix el pacient en base 
          als trets fenotípics observats.
        </p>
        
        <button className="button" onClick = {() => {navigate('./pages/Login');}}>Login
        </button>
        <button className="button" onClick = {() => {navigate('./pages/Register');}}>Register
        </button>
      </main>
    )
}
export default Main;