import React from 'react'
import Part from './Part/part'

const Content = ({ parts }) => {
    
    const total = parts.map(item => item.exercises).reduce((s, p) => s + p)
    
    return parts && parts.length > 1 ? (
      <>
        {parts.map((excercise, index) => {
            return <Part key={excercise.id} name={excercise.name} count={excercise.exercises} />
        })}
        
        <p><strong>Total of {total} exercises</strong></p>
      </>
    ) : null
  }

export default Content  