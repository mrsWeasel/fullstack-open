const Anecdote = ({ anecdote }) => {
  if (!anecdote) return <div><h2>Anecdote not found!</h2></div>

  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info, see <a href={anecdote.info} target='_blank' rel='noopener noreferrer'>{anecdote.info}</a></p>
    </div>
  )
}

export default Anecdote