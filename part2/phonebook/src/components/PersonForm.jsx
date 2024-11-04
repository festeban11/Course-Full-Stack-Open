const PersonForm = (props) => (
    <>
    <form onSubmit={props.addName}>
        <div>
      name:
      <input
          value={props.newName}
          onChange={props.handleNameChange}
        />  
        </div>
        <div>
        number:
        <input
          value={props.newNumber}
          onChange={props.handleNumberChange}
        /> 
        </div>
        <button type="submit">save</button>
      </form> 
    </>
)
export default PersonForm