import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleAddAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch(addAnecdote(content))
        event.target.anecdote.value = ''
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