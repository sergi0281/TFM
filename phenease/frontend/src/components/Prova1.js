
function Prova1(props){ 
    //console.log(props.pacients)
    return(
    <div>
        <div><strong>Pacinets amb el gen {props.gen} alterat:</strong></div>
        {props.pacients.map((pacient) => (
          <div class="pacientGen" key={pacient.id}>
            <p>{pacient.codi_pacient}  {pacient.sexe} </p>
          </div>
        ))}
      </div>
    )
}
export default Prova1;
