import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'



const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const contentDisplayStyle = { display: visible ? 'block' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      {!visible && <button onClick={toggleVisibility}>Show / hide</button>}
      <div style={contentDisplayStyle}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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
    blogService.getAllBlogs().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedInBlogUser = window.localStorage.getItem('loggedInBlogUser')
    if (!loggedInBlogUser) return

    const user = JSON.parse(loggedInBlogUser)
    setUser(user)
  }, [])

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

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const data = await blogService.createBlog(title, author, url)

    if (data.errorMessage) {
      console.log(data.errorMessage)
      handleShowErrorMessage(`Error creating blog: ${data.errorMessage}`)
      return
    }
    createBlogFormRef.current.toggleVisibility()
    handleShowSuccessMessage(`Blog '${data.title}' created successfully!`)
    const updatedBlogs = [...blogs, data]
    setBlogs(updatedBlogs)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleInputChange = (event) => {
    const { id, value } = event?.target || {}
    switch (id) {
      case 'username': return setUsername(value)
      case 'password': return setPassword(value)
      case 'title': return setTitle(value)
      case 'author': return setAuthor(value)
      case 'url': return setUrl(value)
      default: return null
    }
  }

  const renderError = () => {
    return <div style={{ border: '2px solid red', padding: 16 }}>{errorMessage}</div>
  }

  const renderSuccess = () => {
    return <div style={{ border: '2px solid green', padding: 16 }}>{successMessage}</div>
  }

  const renderCreateBlogForm = () => {
    return (
      <form onSubmit={handleCreateBlog}>
        <label>
          Title:
          <input type='text' id='title' value={title || ''} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Author:
          <input type='text' id='author' value={author || ''} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Url:
          <input type='text' id='url' value={url || ''} onChange={handleInputChange} />
        </label>
        <br />
        <input type='submit' />
      </form>
    )
  }

  const renderBlogs = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
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
          <h3>Create new blog</h3>
          <Togglable buttonLabel='Create new blog' ref={createBlogFormRef}>
            {renderCreateBlogForm()}
          </Togglable>
        </>
        :
      
          <LoginForm username={username} password={password} handleLogin={handleLogin} handleInputChange={handleInputChange} />
      }
    </div>
  )


}

export default App
