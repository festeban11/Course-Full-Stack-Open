import { useState } from 'react'
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [searchName, setSearchName] = useState('')
  const [search, setSearch] = useState([])
  const [newNumber, setNewNumber] = useState('')

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