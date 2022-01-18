import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1231244' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const exists = persons.filter(person => person.name === newName)
    if (exists.length > 0) {
      alert(`${newName} is already in the phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number:newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }

    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange}/>
        </div>
        <div>
          number: <input 
                    value={newNumber}
                    onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}><b>{person.name}</b> {person.number}</p>)}
    </div>
  )

}

export default App