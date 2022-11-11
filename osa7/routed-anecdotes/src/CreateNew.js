import { useNavigate } from 'react-router-dom'
import { useField } from './hooks'

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')    
    
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault()

      props.addNew({
        content: content.props.value,
        author: author.props.value,
        info: info.props.value,
        votes: 0
      })
      navigate('/')
    }

    const resetForm = () => {
        content.reset()
        author.reset()
        info.reset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content.props} />
          </div>
          <div>
            author
            <input {...author.props} />
          </div>
          <div>
            url for more info
            <input {...info.props} />
          </div>
          <input type='submit' value='Create'/>
          <button type='button' onClick={resetForm}>Reset</button>
        </form>
      </div>
    )
  
  }

  export default CreateNew