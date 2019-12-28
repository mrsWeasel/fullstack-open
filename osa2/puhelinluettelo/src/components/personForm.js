import React from 'react'

const PersonForm = props => {
  const {
    handleAddNewPerson,
    handleSetNewName,
    handleSetNewPhonenumber,
    newName,
    newPhonenumber,
  } = props

  return (
    <form onSubmit={handleAddNewPerson}>
      <div>
        <label style={{ fontWeight: 'bold' }}>
          Name: <input value={newName} onChange={handleSetNewName} />
        </label>

        <label style={{ fontWeight: 'bold' }}>
          Number:{' '}
          <input value={newPhonenumber} onChange={handleSetNewPhonenumber} />
        </label>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default PersonForm
