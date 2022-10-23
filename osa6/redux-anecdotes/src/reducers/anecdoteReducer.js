import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    addAnecdote(state, action) {
      const anecdote = action.payload
      state.push({
        content: anecdote?.content,
        votes: 0,
        id: anecdote?.id,
      })
    },
    vote(state, action) {
      const id = action.payload

      const newState = state.map(a => {
        if (a.id === id) {
          return {...a, votes: a.votes + 1}
        } else {
          return a
        }
      })
      return newState
    },
    sort(state) {
      const anecdotes = [...state]
      const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
      return sortedAnecdotes
    }
  }
})

export const { addAnecdote, vote, sort, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer