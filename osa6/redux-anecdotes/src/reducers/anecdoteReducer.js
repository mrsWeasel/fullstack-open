import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0))
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
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

export const { addAnecdote, vote, sort } = anecdoteSlice.actions
export default anecdoteSlice.reducer