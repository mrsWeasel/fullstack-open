import React from 'react'

const PersonForm = props => {
  const labelStyles = {
    display: 'block'
  }

  const inputStyles = {
    display: 'block',
    width: '100%',
    padding: 8,
    boxSizing: 'border-box',
    marginBottom: 16,
    borderColor: '#333',
    borderWidth: 0,
    borderBottomWidth: 1
  }

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
        <label style={labelStyles}>
          Name: <input style={inputStyles} value={newName} onChange={handleSetNewName} />
        </label>

        <label style={labelStyles}>
          Number:{' '}
          <input style={inputStyles} value={newPhonenumber} onChange={handleSetNewPhonenumber} />
        </label>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default PersonForm
