import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'

describe('<Blog/>', () => {
  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  }
  let container

  beforeEach(() => { container = render(<Blog blog={blog} />).container })

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

  test('when like button is clicked twice, event handler function is also called twice', async () => {
    // const mockAddLike = container.instance().handleAddLike
    // container.instance().handleAddLike = jest.fn()
    // console.log(container.instance())
    const spyHandleAddLike = jest.spyOn(blogService, 'likeBlog')

    const user = userEvent.setup()
    const toggleButton = container.querySelector('.toggleButton')
    await user.click(toggleButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    // console.log(container)
    expect(spyHandleAddLike).toBeCalledTimes(2)
  })

})