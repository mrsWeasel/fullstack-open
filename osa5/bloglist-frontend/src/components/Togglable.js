import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const contentDisplayStyle = { display: visible ? 'block' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      {!visible && props.useCancel && <button onClick={toggleVisibility}>{props.buttonLabel}</button>}
      {!props.useCancel && <button onClick={toggleVisibility}>{!visible ? props.buttonLabel : 'Hide'}</button>}
      <div style={contentDisplayStyle}>
        {props.children}
        {props.useCancel && <button onClick={toggleVisibility}>Cancel</button>}
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  useCancel: PropTypes.bool,
}

Togglable.displayName = 'Togglable'
export default Togglable