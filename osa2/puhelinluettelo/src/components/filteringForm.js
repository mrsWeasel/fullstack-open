import React from 'react'

const FilteringForm = ({ value, onChange }) => {
  return (
    <div>
      <label style={{fontWeight: 'bold'}}>
        Filter shown with: <input value={value} onChange={onChange} />
      </label>
    </div>
  )
}

export default FilteringForm
