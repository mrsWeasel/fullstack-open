import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveReview = func => () => {
    func(value => value + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={giveReview(setGood)}>Good</Button>
      <Button onClick={giveReview(setNeutral)}>Neutral</Button>
      <Button onClick={giveReview(setBad)}>Bad</Button>
      <h2>Statistics</h2>
      <Statistics statistics={[good, neutral, bad]} />
    </div>
  )
}

const Statistics = ({ statistics }) => {
  const getAllClicks = () => {
    let all = 0
    statistics.forEach(s => (all += s))
    return all
  }

  const getAverage = () => {
    let total = statistics[0] - statistics[2]
    return total === 0 ? 0 : total / getAllClicks()
  }

  const getPositiveClicks = () => {
    const positive = (statistics[0] / getAllClicks()) * 100

    return positive > 0 ? positive : 0
  }

  return getAllClicks() ? (
    <div>
      <table>
        <tbody>
          <Statistic text="Good" value={statistics[0]} />
          <Statistic text="Neutral" value={statistics[1]} />
          <Statistic text="Bad" value={statistics[2]} />
          <Statistic text="All" value={getAllClicks()} />
          <Statistic text="Average" value={getAverage()} />
          <Statistic text="Positive" value={getPositiveClicks() + ' %'} />
        </tbody>
      </table>
    </div>
  ) : (
    <div>
      <p>No feedback given</p>
    </div>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <th style={{ textAlign: 'left', padding: '0.5rem' }}>{text}</th>
      <td style={{ padding: '0.5rem' }}>{value}</td>
    </tr>
  )
}

const Button = props => {
  return <button onClick={props.onClick}>{props.children}</button>
}

ReactDOM.render(<App />, document.getElementById('root'))
