import { useState, useEffect} from 'react'
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [searchName, setSearchName] = useState('')
  const [search, setSearch] = useState([])
  const [newNumber, setNewNumber] = useState('')



  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)


    const isInPhonebook = persons.filter((person) => person.name === newName).length > 0
    if(isInPhonebook){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      const nameObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
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
  
  const contactsToShow = searchName === ''  ? persons : search

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter newNumber={newNumber} handleSearchChange={handleSearchChange} />
     
      <h2>Add New</h2>
        <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons contactsToShow={contactsToShow} />
    </div>
  )
}

export default App