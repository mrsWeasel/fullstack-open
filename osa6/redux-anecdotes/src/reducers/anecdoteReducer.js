import { createSlice } from '@reduxjs/toolkit'

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0))
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    addAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        votes: 0,
        id: generateId()
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
export default anecdoteSlice.reducer