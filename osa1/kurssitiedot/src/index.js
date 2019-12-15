import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        count: 10,
      },
      {
        name: 'Using props to pass data',
        count: 7,
      },
      {
        name: 'State of a component',
        count: 14,
      },
    ],
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Content = ({ parts }) => {
  const content = []

  return parts && parts.length > 1 ? (
    <>
      {parts.forEach((excercise, index) => {
        content.push(
          <Part key={index} name={excercise.name} count={excercise.count} />
          
        )
      })}
      {content}
    </>
  ) : null
}

const Part = ({ name, count }) => {
  return (
    <p>
      {name} {count}
    </p>
  )
}

const Total = ({ parts }) => {
  let total = 0

  return parts && parts.length > 1 ? (
    <p>
      {parts.forEach(excercise => {
        total += excercise.count
      })}
      {total}
    </p>
  ) : null
}

ReactDOM.render(<App />, document.getElementById('root'))
