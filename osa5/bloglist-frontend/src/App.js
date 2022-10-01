import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 

  useEffect(() => {
    blogService.getAll().then(blogs =>
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
    if (!data) {
      console.log('Error fetching data')
      return
    }

    if (data.error) {
      console.log(data.error.code)
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

  const handleChangeUsername = (event) => {
    setUsername(event.target.value)
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const renderForm = () => {
    return(
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type='text' value={username || ''} onChange={handleChangeUsername}/>
        </label>

        <label>
          Password:
          <input type='password' value={password || ''} onChange={handleChangePassword}/>
        </label>

        <input type='submit' />
      </form>
    )
  }

  const renderBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    user ? renderBlogs() : renderForm()
  )

  
}

export default App
