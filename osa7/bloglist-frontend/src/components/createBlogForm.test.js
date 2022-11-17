import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

describe('<CreateBlogForm/>', () => {
  test('form is sent with correct data', async () => {
    const user = userEvent.setup()
    const handleCreateBlog = jest.fn()

    render(<CreateBlogForm handleCreateBlog={handleCreateBlog} />)

    const inputs = screen.getAllByRole('textbox')
    const submit = screen.getByText('Create blog')

    await user.type(inputs[0], 'Title here')
    await user.type(inputs[1], 'Author here')
    await user.type(inputs[2], 'Url here')
    await user.click(submit)

    expect(handleCreateBlog.mock.calls).toHaveLength(1)
    expect(handleCreateBlog.mock.calls[0][0]).toEqual({
      title: 'Title here',
      author: 'Author here',
      url: 'Url here',
    })
  })
})
