import React, { useEffect, useState } from 'react'
import personService from './services/persons'
import PersonForm from './components/personForm'
import FilteringForm from './components/filteringForm'
import Persons from './components/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhonenumber, setNewPhonenumber] = useState('')
  const [filteringCondition, setFilteringCondition] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleChangeFilteringCondition = event => setFilteringCondition(event.target.value)

  const showPerson = name => {
    if (!filteringCondition) return true
    if (name.toLowerCase().includes(filteringCondition.toLowerCase())) return true

    return false
  }

  const handleSetNewName = event => setNewName(event.target.value)

  const handleSetNewPhonenumber = event => setNewPhonenumber(event.target.value)

  const handleAddNewPerson = event => {
    event.preventDefault()

    if (newName.trim().length < 1) return

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook.`)
      setNewName('')
      setNewPhonenumber('')
      return
    }

    const personObject = {
      name: newName.trim(),
      number: newPhonenumber.trim()
    }

    personService.create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewPhonenumber('')
      })

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm 
        handleAddNewPerson={handleAddNewPerson}
        handleSetNewName={handleSetNewName}
        handleSetNewPhonenumber={handleSetNewPhonenumber}
        newName={newName}
        newPhonenumber={newPhonenumber}
      />

      <h2>Numbers</h2>
      <FilteringForm value={filteringCondition} onChange={handleChangeFilteringCondition} />
      <Persons persons={persons} showPerson={showPerson} />

    </div>
  )
}

export default App
