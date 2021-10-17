import React from 'react'

const FilteringForm = ({ value, onChange }) => {
  const labelStyles = {
    display: 'block'
  }

  const inputStyles = {
    display: 'block',
    width: '100%',
    padding: 8,
    boxSizing: 'border-box',
    marginBottom: 24,
    borderColor: '#333',
    borderWidth: 0,
    borderBottomWidth: 1
  }

  return (
    <div>
      <label style={labelStyles}>
        Filter shown with: <input style={inputStyles} value={value} onChange={onChange} />
      </label>
    </div>
  )
}

export default FilteringForm
