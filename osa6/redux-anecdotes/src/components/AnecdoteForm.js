import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleAddAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        dispatch(createAnecdote(content))
        dispatch(notify(`You added "${content}"`, 5))
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