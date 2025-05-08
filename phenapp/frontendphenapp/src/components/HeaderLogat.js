import Logo from "./Logo";
import Sessio from "./Sessio";
function Header(props){ 
    return(
    <div>
        <header className="App-header">
            <div>
            <Logo />
            </div>
            <div>
            <Sessio nom={props.nom} />
            </div> 
        </header>
    </div>
    )
}
export default Header;
      