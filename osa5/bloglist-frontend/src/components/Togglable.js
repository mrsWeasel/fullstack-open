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
            {!visible && <button onClick={toggleVisibility}>{props.buttonLabel}</button>}
            <div style={contentDisplayStyle}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
  })

  export default Togglable