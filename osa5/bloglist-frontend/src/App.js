import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAllBlogs().then(blogs =>
      setBlogs( blogs )
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
      return
    }

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
      return
    }
    const updatedBlogs = [...blogs, data]
    setBlogs(updatedBlogs)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleInputChange = (event) => {
    const { id, value } = event?.target || {}
    switch (id) {
      case 'username' : return setUsername(value)
      case 'password' : return setPassword(value)
      case 'title' : return setTitle(value)
      case 'author' : return setAuthor(value)
      case 'url' : return setUrl(value)
      default : return null
    }
  }

  const renderCreateBlogForm = () => {
    return (
      <form onSubmit={handleCreateBlog}>
        <label>
          Title:
          <input type='text' id='title' value={title|| ''} onChange={handleInputChange}/>
        </label>
        <br/>
        <label>
          Author:
          <input type='text' id='author' value={author || ''} onChange={handleInputChange}/>
        </label>
        <br/>
        <label>
          Url:
          <input type='text' id='url' value={url || ''} onChange={handleInputChange}/>
        </label>

        <input type='submit' />
      </form>
    )
  }

  const renderLoginForm = () => {
    return(
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type='text' id='username' value={username || ''} onChange={handleInputChange}/>
        </label>

        <label>
          Password:
          <input type='password' id='password' value={password || ''} onChange={handleInputChange}/>
        </label>

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
    user ? 
      <>
      {renderBlogs()}
      <h3>Create new blog</h3> 
      {renderCreateBlogForm()}
      </>
    :
      <>
      {renderLoginForm()}
      </>

  )

  
}

export default App
