import './App.css'; 
import { OntologiaProvider } from './OntologiaContext';   
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

function App() {
  
  return (
    <OntologiaProvider>
    <div className="App">
      <Header />
      <Main />
    </div>
    </OntologiaProvider>
  );
}
export default App;