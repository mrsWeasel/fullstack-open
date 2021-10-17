import React from 'react'

const Notification = ({ type, message }) => {
    const TYPEERROR = 'error'
    const TYPESUCCESS = 'success'
    let backgroundColor = ''
    
    if (type === TYPEERROR) {
        backgroundColor = '#FECBCB'
    }

    if (type === TYPESUCCESS) {
        backgroundColor = '#D2FEDC'
    }

    const styles = {
      position: 'fixed',
      bottom: 10,
      left: 10,
      right: 10,
      padding: 16,
      backgroundColor: backgroundColor,
      borderRadius: 4,
      transition: 'all 1s ease-in-out'
    }
  
    return (
      <div style={styles}>
        {message}
      </div>
    )
  }

export default Notification