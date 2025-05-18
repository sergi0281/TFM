
function GrupPacients(props){ 
    //console.log(props.pacients)
    return(
    <div>
        <div><strong>Pacients amb el gen {props.gen} alterat:</strong></div>
        {props.pacients.map((pacient) => (
          <div className="pacientGen" key={pacient.id}>
            <p>{pacient.codi_pacient}  {pacient.sexe} </p>
          </div>
        ))}
      </div>
    )
}
export default GrupPacients;
