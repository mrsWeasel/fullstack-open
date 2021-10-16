import React from 'react'

const Persons = ({persons, showPerson, deletePerson}) => {
    return (
        <div>
        {persons.map(person => (
          showPerson(person.name) &&
          <p key={person.name}>
            {person.name} {person.number}
            <button onClick={()=>deletePerson(person.id)}>Delete</button>
          </p>
        ))}
      </div>
    )
}

export default Persons