
function GrupTrets(props){ 
    //console.log(props.trets)
    return (
        <div>
          <div><strong>Trets fenotípics associats a l'alteració del gen {props.gen}:</strong></div>
            {props.trets.map((tret, index) => (
              <div className="termebis">
                <div className="terme1bis">
                  <b>{tret}</b>
                </div>
            </div>
            ))}
        </div>
      );
}
export default GrupTrets;
