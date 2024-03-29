import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = props => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  const getRandomAnecdote = () => {
    const length = props.anecdotes.length
    let next = Math.floor(Math.random() * Math.floor(length))

    // Do not display same anecdote twice in a row
    while (next === selected) {
      next = Math.floor(Math.random() * Math.floor(length))
    }

    setSelected(next)
  }

  const vote = selected => () => {
    const newVotes = votes[selected] ? votes[selected] + 1 : 1
    setVotes({
      ...votes,
      [selected]: newVotes,
    })
  }

  const getMostPopularAnecdote = () => {
    let highest = 0
    let chosen = null

    Object.entries(votes).forEach(val => {
      if (val[1] > highest) {
        highest = val[1]
        chosen = val[0]
      }
    })

    return chosen
  }

  const chosen = getMostPopularAnecdote()

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{props.anecdotes[selected]}</p>
        <p>has {votes[selected] ? votes[selected] : 0} votes</p>
      </div>
      <div>
        <button onClick={vote(selected)}>Vote</button>
        <button onClick={getRandomAnecdote}>Next anecdote</button>
      </div>
      {chosen && (
        <div>
          <h2>Anecdote with most votes</h2>
          <p>{anecdotes[chosen]}</p>
          <p>has {votes[chosen] ? votes[chosen] : 0} votes</p>
        </div>
      )}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
