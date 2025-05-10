//import Pacient from "../components/Pacient";
import Prova1 from "../components/Prova1";
import Prova2 from "../components/Prova2";
import Prova4 from "../components/Prova4";


function PacientsPerGen(props){ 
    const nom = props.nomclinic;
    const idclinic = props.idclinic;
    console.log("a pacient per ger tinc aquest idclinic")
    console.log(nom)
    console.log(idclinic)

    //const agruparPacients = (llista) => {
    //    return llista.reduce((acc, pacient) => {
    //      const gen = pacient.gen || 'Desconegut';
    //      if (!acc[gen]) acc[gen] = [];
    //      acc[gen].push(pacient);
    //      return acc;
    //    }, {});
    //  };
    
    //const agruparPacients = (llista) => {
    //  return llista.reduce((acc, pacient) => {
    //    const gen = pacient.gen || 'Desconegut';
    //    if (!acc[gen]) { //crearem una nova entrada a l'array de sortida si no existia
    //      acc[gen] = {
    //        pacients: [],   //en aquesta variable agruparem els pacients segons el gen afectat
    //        trets: new Set()  // en aquesta variable agruparem tots els trets fenotípics que tenen els 
                              // pacients amb aquell gen afectat
    //      };
    //    }
    
    //    acc[gen].pacients.push(pacient);
    
    //    if (Array.isArray(pacient.trets)) {
    //      pacient.trets.forEach(tret => acc[gen].trets.add(tret));
    //    }
    
    //    return acc;
    //  }, {});
    //};

    const agruparPacients = (llista) => {
      //return llista.reduce((acc, pacient) => {
        const TretsGen={}
        const TretsPacient={}

        llista.forEach(pacient => {
          console.log("el pacient")
          console.log(pacient)
          const gen = pacient.gen || 'Desconegut';
          if (!TretsGen[gen]) { //crearem una nova entrada a l'array de sortida si no existia
            TretsGen[gen] = {
              pacients: [],   //en aquesta variable agruparem els pacients segons el gen afectat
              trets: new Set()  // en aquesta variable agruparem tots els trets fenotípics que tenen els 
                                // pacients amb aquell gen afectat
            };
          }
          TretsGen[gen].pacients.push(pacient);
          console.log("imprimeixo l'ABCB7")
          console.log(TretsGen["ABCB7"])
      
          if (Array.isArray(pacient.caracteristiques)) {
            pacient.caracteristiques.forEach(tret => TretsGen[gen].trets.add(tret.codi));
          }
          //això de sota surt ok
          //console.log("imprimerixo caractrístiques")
          //console.log(pacient.caracteristiques)

          TretsPacient[pacient.id] = {
            ...pacient,
            trets: Array.isArray(pacient.cafracteristiques) ? [...pacient.caracteristiques] : []
          };
          console.log("trets pacients funciona ok")
          console.log("imprimeixo el TretsPacient")
          console.log(TretsPacient)

        });
      
        Object.values(TretsGen).forEach(grup => {
          grup.trets = Array.from(grup.trets);
        });
        
      return {TretsGen,TretsPacient};
    };

    const { TretsGen, TretsPacient } = agruparPacients(props.pacients);
        
    return(
    <div>
        {Object.entries(TretsGen).map(([gen, grup]) => (
        <div key={gen}>
          <h2>Gen: {gen} ({grup.pacients?.length || 0} pacients)</h2>
          <div className="container">
            <div className="prova1">
            <Prova1 pacients={grup.pacients} gen={gen} />
            </div>
            <div className="prova2">
            <Prova2 trets={grup.trets} gen={gen} />
            </div>
          </div>
          <div className="container2">
            <div className="prova4">
            <Prova4 gen={gen} tretsPacient={TretsPacient} tretsGen={grup.trets}/>
            </div>
          </div>
        </div>
        ))}
    </div>
    )
}
export default PacientsPerGen;