import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog/>', () => {
  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  }
  let container
  const mockHandler = jest.fn()

  beforeEach(() => { container = render(<Blog blog={blog} toggleVisibility={mockHandler}/>).container })

  test('blog shows (only) title and author by default', () => {
    const content = screen.getByText('React patterns | Michael Chan')
    expect(content).toBeDefined()

    const togglableContent = container.querySelector('.togglableContent')
    expect(togglableContent).toHaveStyle('display: none')
  })

  test('when togglable is clicked, hidden information is displayed', async () => {
    const togglableContent = container.querySelector('.togglableContent')
    expect(togglableContent).toHaveStyle('display: none')
   
    const user = userEvent.setup()
    const button = container.querySelector('.toggleButton')
    await user.click(button)
    
    const likes = screen.getByText('Likes:', { exact: false })
    const url = screen.getByText('Url:', { exact: false })
    expect(likes).toBeDefined()
    expect(url).toBeDefined()
  })

})