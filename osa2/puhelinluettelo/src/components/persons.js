import React from 'react'

const Persons = ({persons, showPerson}) => {
    return (
        <div>
        {persons.map(person => (
          showPerson(person.name) &&
          <p key={person.name}>
            {person.name} {person.phonenumber}
          </p>
        ))}
      </div>
    )
}

export default Persons