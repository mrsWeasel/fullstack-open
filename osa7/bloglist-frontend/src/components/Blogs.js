import { useState, useEffect, useRef } from 'react'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import { BlogList } from './blogStyles'

const Blogs = ({ handleShowErrorMessage, handleShowSuccessMessage }) => {
  const createBlogFormRef = useRef()
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAllBlogs().then((blogs) => {
      blogs.sort((a, b) => {
        return b.likes - a.likes
      })
      setBlogs(blogs)
    })
  }, [])

  const handleCreateBlog = async (blog) => {
    const data = await blogService.createBlog(blog)

    if (data.errorMessage) {
      console.log(data.errorMessage)
      handleShowErrorMessage(`Error creating blog: ${data.errorMessage}`)
      return
    }
    createBlogFormRef.current.toggleVisibility()
    handleShowSuccessMessage(`Blog '${data.title}' created successfully!`)
    const updatedBlogs = [...blogs, data]
    setBlogs(updatedBlogs)
  }

  const handleDelete = (blog) => async () => {
    console.log('delete', blog?.title)
    const data = await blogService.deleteBlog(blog)

    if (data.errorMessage) {
      console.log(data.errorMessage)
      handleShowErrorMessage(
        `Error removing ${blog.title}: ${data.errorMessage}`
      )
      return
    }

    const updatedBlogs = blogs.filter((b) => b.id !== blog.id)
    setBlogs(updatedBlogs)
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Togglable
        buttonLabel="Create new blog"
        useCancel={true}
        ref={createBlogFormRef}>
        <CreateBlogForm
          handleShowErrorMessage={handleShowErrorMessage}
          handleShowSuccessMessage={handleShowSuccessMessage}
          handleCreateBlog={handleCreateBlog}
        />
      </Togglable>
      <BlogList>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} handleDelete={handleDelete(blog)} />
        ))}
      </BlogList>
    </div>
  )
}

export default Blogs
