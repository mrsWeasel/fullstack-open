import React from 'react'

const Persons = ({ persons, showPerson, deletePerson }) => {
  const containerStyles = {
    display: 'flex',
    marginBottom: 24
  }
  const paragraphStyles = {
    flexGrow: 1,
    margin: 0
  }
  const buttonStyles = {
    flexGrow: 0
  }
  const boldStyles = {
    fontWeight: 'bold'
  }
  return (
    <div>
      {persons.map(
        (person) =>
          showPerson(person.name) && (
            <div style={containerStyles}>
              <p style={paragraphStyles} key={person.name}>
                <span style={boldStyles}>{person.name}:</span> {person.number}
              </p>
              <button style={buttonStyles} onClick={() => deletePerson(person.id)}>Delete</button>
            </div>
          )
      )}
    </div>
  )
}

export default Persons
