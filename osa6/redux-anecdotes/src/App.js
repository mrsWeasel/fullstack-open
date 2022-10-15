import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const generateId = () => {
    return Number((Math.random() * 1000000).toFixed(0))
    
  }

  const addAnecdote = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value

    dispatch({
      type: 'ADD_ANECDOTE',
      data: {
        content,
        id: generateId()
      }
    })
  }

  const vote = (id) => {
    console.log('vote', id)
    dispatch({
      type: 'ADD_VOTE',
      id
    })
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input type='text' name='anecdote' />
        <input type='submit' value='Add' />
      </form>
    </div>
  )
}

export default App