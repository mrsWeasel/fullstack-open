import { useSelector, useDispatch } from 'react-redux'
import { vote, sort } from '../reducers/anecdoteReducer'
import { changeText, toggleVisibility } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
 
    const dispatch = useDispatch()

    const handleVote = (anecdote) => () => {
        const {id, content} = anecdote || {}
        dispatch(vote(id))
        dispatch(sort())
        dispatch(changeText(`You voted for "${content}"`))
        dispatch(toggleVisibility(true))
        setTimeout(() => dispatch(toggleVisibility(false)), 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList