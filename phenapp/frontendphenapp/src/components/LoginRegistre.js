
import { Link } from 'react-router-dom';

function LoginRegistre(){
    return (
        <div className="App-logreg">
          <p><Link to="/pages/Login">Login</Link>/<Link to="/pages/Register">Registre</Link></p>
        </div>
    )
}

export default LoginRegistre;