import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from './buttonStyles'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const contentDisplayStyle = { display: visible ? 'block' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      {!visible && props.useCancel && (
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      )}
      {!props.useCancel && (
        <Button className="toggleButton" onClick={toggleVisibility}>
          {!visible ? props.buttonLabel : 'Hide'}
        </Button>
      )}
      <div className="togglableContent" style={contentDisplayStyle}>
        {props.children}
        {props.useCancel && <Button onClick={toggleVisibility}>Cancel</Button>}
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
