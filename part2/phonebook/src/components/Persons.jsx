const Person = (props) => (
    <>
    <div>
        {props.contactsToShow.map((person, i) => 
         <div key={i}>
         {person.name + " "}
         {person.number}
          <button onClick={() => props.handleDeletePerson(person.name, person.id)}>delete</button>
        </div>
          
        )}
      </div>
    </>
)

export default Person