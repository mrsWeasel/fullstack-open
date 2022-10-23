import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])
    
    const anecdotes = useSelector((state) => {
        if (!state.filter) return state.anecdotes
        const filteredAnecdotes = state.anecdotes.filter((a) => a.content.toLowerCase().includes(state.filter.toLowerCase()))
        return filteredAnecdotes
    })

    const handleVote = (anecdote) => () => {
        const {id, content} = anecdote || {}
        dispatch(voteAnecdote(id))
        dispatch(notify(`You voted for "${content}"`, 5))
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