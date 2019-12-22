import React from 'react'
import Header from './Header/header'
import Content from './Content/content'

const Course = ({course}) => {
    return (
        <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
        </div>
      )
}

export default Course