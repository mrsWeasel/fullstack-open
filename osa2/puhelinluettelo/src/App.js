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
    personService.getAll().then((response) => {
      setPersons(response.data)
    })
  }, [])

  const handleChangeFilteringCondition = (event) =>
    setFilteringCondition(event.target.value)

  const showPerson = (name) => {
    if (!filteringCondition) return true
    if (name.toLowerCase().includes(filteringCondition.toLowerCase()))
      return true

    return false
  }

  const handleSetNewName = (event) => setNewName(event.target.value)

  const handleSetNewPhonenumber = (event) =>
    setNewPhonenumber(event.target.value)

  const handleAddNewPerson = (event) => {
    event.preventDefault()

    if (newName.trim().length < 1) return

    const person = persons.find((p) => p.name === newName)

    if (!person) {
      const newPerson = {
        name: newName.trim(),
        number: newPhonenumber.trim(),
      }

      personService.create(newPerson).then((response) => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewPhonenumber('')
      })
      return
    }

    if (
      window.confirm(
        `${newName} is already added to phonebook. Do you want to replace the old number with the new one?`
      )
    ) {
      const updatedPerson = { ...person, number: newPhonenumber.trim() }
      console.log(updatedPerson.number, updatedPerson.name, updatedPerson.id)
      personService.update(person.id, updatedPerson)
      .then((response) => {
        setNewName('')
        setNewPhonenumber('')
        setPersons(
          persons.map((p) => (p.id === updatedPerson.id ? updatedPerson : p))
        )
      })
      .catch((error) => {
        alert(error)
      })
      return
    }
    setNewName('')
    setNewPhonenumber('')
    return
  }

  const handleDeletePerson = (id) => {
    const person = persons.find((p) => p.id === id)
    if (!window.confirm(`Are you sure you want to remove ${person.name}?`))
      return

    personService
      .remove(id)
      .then((response) => {
        setPersons(persons.filter((p) => p.id !== id))
      })
      .catch((error) => {
        alert(error)
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
      <FilteringForm
        value={filteringCondition}
        onChange={handleChangeFilteringCondition}
      />
      <Persons
        persons={persons}
        showPerson={showPerson}
        deletePerson={handleDeletePerson}
      />
    </div>
  )
}

export default App
