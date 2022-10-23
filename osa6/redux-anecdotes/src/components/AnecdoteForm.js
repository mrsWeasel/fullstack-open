import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { changeText, toggleVisibility } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleAddAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        dispatch(createAnecdote(content))
        dispatch(changeText(`You added "${content}"`))
        dispatch(toggleVisibility(true))
        setTimeout(() => dispatch(toggleVisibility(false)), 5000)
      }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={handleAddAnecdote}>
                <input type='text' name='anecdote' />
                <input type='submit' value='Add' />
            </form>
        </div>
    )
}

export default AnecdoteForm