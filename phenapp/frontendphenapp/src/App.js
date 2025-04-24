import './App.css'; 
// si el export en Login.js està al final no posem claus; si el emporta està al principi posem claus
import './pages/Login'
import './pages/Register'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

function App() {
  
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
export default App;