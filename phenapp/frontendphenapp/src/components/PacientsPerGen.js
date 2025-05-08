import Pacient from "../components/Pacient";
function PacientsPerGen(props){ 
    
    const agruparPacients = (llista) => {
        return llista.reduce((acc, pacient) => {
          const gen = pacient.gen || 'Desconegut';
          if (!acc[gen]) acc[gen] = [];
          acc[gen].push(pacient);
          return acc;
        }, {});
      };
    const pacientsGen = agruparPacients(props.pacients);
      
      
    return(
    <div>
        <div>
        {Object.entries(pacientsGen).map(([gen, grup]) => (
            <div key={gen} >
              <h2>Gen: {gen} ({grup.length} pacients)</h2>
              {grup.map((pacient) => (
                <div key={pacient.id}>
                  <Pacient
                    id={pacient.id}
                    nom={pacient.nom}
                    cognom={pacient.cognom}
                    codi={pacient.codi_pacient}
                    clinic="sergi"
                    caracteristiques={pacient.caracteristiques}
                    malalties={pacient.malalties}
                    idclinic={props.id}
                    gen={pacient.gen}
                    malaltia={pacient.malaltia}
                  />
                </div>
                ))}
            </div>
            ))}
        </div>
    </div>
    )
}
export default PacientsPerGen;