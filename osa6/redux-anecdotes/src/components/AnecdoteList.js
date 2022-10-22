import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote, sort, setAnecdotes } from '../reducers/anecdoteReducer'
import { changeText, toggleVisibility } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        anecdoteService
        .getAll()
        .then(anecdotes => dispatch(setAnecdotes(anecdotes)))
    }, [dispatch])

    const anecdotes = useSelector((state) => {
        if (!state.filter) return state.anecdotes
        
        const filteredAnecdotes = state.anecdotes.filter((a) => a.content.toLowerCase().includes(state.filter.toLowerCase()))
        return filteredAnecdotes
    })

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