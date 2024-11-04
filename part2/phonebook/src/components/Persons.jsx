const Person = (props) => (
    <>
    <div>
        {props.contactsToShow.map((person, i) => 
         <div key={i}>
         {person.name + " "}
         {person.number}
        </div>
          
        )}
      </div>
    </>
)

export default Person