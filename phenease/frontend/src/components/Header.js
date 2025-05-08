import Logo from "./Logo";
import LoginRegistre from "./LoginRegistre";
function Header(){ 
    return(
    <div>
        <header className="App-header">
            <div>
            <Logo />
            </div>
            <div>
            <LoginRegistre />
            </div> 
        </header>
    </div>
    )
}
export default Header;
      