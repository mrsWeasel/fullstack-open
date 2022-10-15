import { useSelector, useDispatch } from 'react-redux'
import { addAnecdote, vote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  anecdotes.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const handleAddAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(addAnecdote(content))
  }

  const handleVote = (id) => () => {
    dispatch(vote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <input type='text' name='anecdote' />
        <input type='submit' value='Add' />
      </form>
    </div>
  )
}

export default App