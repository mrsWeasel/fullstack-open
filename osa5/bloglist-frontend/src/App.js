import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const createBlogFormRef = useRef()

  const handleShowErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => { setErrorMessage('') }, 4000)
  }

  const handleShowSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => { setSuccessMessage('') }, 4000)
  }

  useEffect(() => {
    blogService.getAllBlogs().then(blogs => {
      blogs.sort((a,b) => {return a.likes - b.likes})
      setBlogs(blogs)
    }
    )
  }, [])

  useEffect(() => {
    const loggedInBlogUser = window.localStorage.getItem('loggedInBlogUser')
    if (!loggedInBlogUser) return

    const user = JSON.parse(loggedInBlogUser)
    setUser(user)
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

  const handleLogin = async (event) => {
    event.preventDefault()
    const data = await loginService.login(username, password)

    if (data.errorMessage) {
      console.log(data.errorMessage)
      handleShowErrorMessage(`Error logging in: ${data.errorMessage}`)
      return
    }
    handleShowSuccessMessage(`Logged in successfully! Welcome ${data?.name}!`)

    window.localStorage.setItem(
      'loggedInBlogUser', JSON.stringify(data)
    )

    setUser(data)
    setUsername('')
    setPassword('')
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedInBlogUser')
    setUser(null)
  }

  const handleInputChange = (event) => {
    const { id, value } = event?.target || {}
    switch (id) {
      case 'username': return setUsername(value)
      case 'password': return setPassword(value)
      default: return null
    }
  }

  const handleDelete = (blog) => async () => {
    console.log('delete', blog?.title)
    const data = await blogService.deleteBlog(blog)

    if (data.errorMessage) {
      console.log(data.errorMessage)
      handleShowErrorMessage(`Error removing ${blog.title}: ${data.errorMessage}`)
      return
    }

    const updatedBlogs = blogs.filter(b => b.id !== blog.id)
    setBlogs(updatedBlogs)
  }

  const renderError = () => {
    return <div style={{ border: '2px solid red', padding: 16 }}>{errorMessage}</div>
  }

  const renderSuccess = () => {
    return <div style={{ border: '2px solid green', padding: 16 }}>{successMessage}</div>
  }

  const renderBlogs = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleDelete={handleDelete(blog)}/>
        )}
      </div>
    )
  }

  return (
    <div>
      {errorMessage && renderError()}
      {successMessage && renderSuccess()}
      {user ?
        <>
          {renderBlogs()}
          <Togglable buttonLabel='Create new blog' useCancel={1} ref={createBlogFormRef}>
            <CreateBlogForm handleShowErrorMessage={handleShowErrorMessage} handleShowSuccessMessage={handleShowSuccessMessage} handleCreateBlog={handleCreateBlog} />
          </Togglable>
        </>
        :

        <LoginForm username={username} password={password} handleLogin={handleLogin} handleInputChange={handleInputChange} />
      }
    </div>
  )


}

export default App
