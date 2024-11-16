import { useState, useEffect} from 'react'
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import personServices from './services/persons';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [searchName, setSearchName] = useState('')
  const [search, setSearch] = useState([])
  const [newNumber, setNewNumber] = useState('')



  useEffect(() => {
    personServices.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)
    const isInPhonebook = persons.filter((person) => person.name === newName).length > 0
    if(isInPhonebook){
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (result){
        const person = persons.find((person) => person.name === newName)
        const changedPerson = {...person, number: newNumber}
        personServices.update(person.id, changedPerson).then((response) => {
          console.log(response)
          setPersons(
            persons.map((person) => (person.name === newName ? changedPerson : person))
          );
        })        
      }
    }
    else{
      const nameObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
      personServices.create(nameObject).then((response) => {
        console.log(response)
      })
    }
    setNewName('')
    setNewNumber('')
    
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)    
    setNewName(event.target.value)  
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)    
    setNewNumber(event.target.value)  
  }

  const handleSearchChange = (event) => {
    //console.log(event.target.value)    
    const searchValue = event.target.value.toLowerCase();
    setSearchName(searchValue)
    const matchedPerson = persons.filter((person) => 
        person.name.toLowerCase().includes(searchValue)
    );
    setSearch(matchedPerson)
  }

  const handleDeletePerson = (name, id) => {
    const result = window.confirm(`Delete ${name} ?`);
    if(result){
      personServices.deletePerson(id).then((response) => {
        console.log(response)
      });
      setPersons(persons.filter((person) => person.id !== id
      ));
    }
  }
  
  const contactsToShow = searchName === ''  ? persons : search

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter newNumber={newNumber} handleSearchChange={handleSearchChange} />
     
      <h2>Add New</h2>
        <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons contactsToShow={contactsToShow} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App