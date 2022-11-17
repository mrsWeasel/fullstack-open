import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import { Link, Route, Routes } from 'react-router-dom'
import Blogs from './components/Blogs'
import Users from './components/Users'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleShowErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
    }, 4000)
  }

  const handleShowSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage('')
    }, 4000)
  }

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
    handleShowSuccessMessage(
      `Logged in successfully! Welcome ${data?.name ?? ''}!`
    )

    window.localStorage.setItem('loggedInBlogUser', JSON.stringify(data))

    setUser(data)
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogUser')
    setUser(null)
  }

  const handleInputChange = (event) => {
    const { id, value } = event?.target || {}
    switch (id) {
      case 'username':
        return setUsername(value)
      case 'password':
        return setPassword(value)
      default:
        return null
    }
  }

  const renderError = () => {
    return (
      <div style={{ border: '2px solid red', padding: 16 }}>{errorMessage}</div>
    )
  }

  const renderSuccess = () => {
    return (
      <div style={{ border: '2px solid green', padding: 16 }}>
        {successMessage}
      </div>
    )
  }

  return (
    <div>
      {errorMessage && renderError()}
      {successMessage && renderSuccess()}
      {user ? (
        <>
          <h2>Blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <div>
            <Link to="/">Blogs</Link>
            <Link to="/users">Users</Link>
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <Blogs
                  handleShowErrorMessage={handleShowErrorMessage}
                  handleShowSuccessMessage={handleShowSuccessMessage}
                />
              }
            />
            <Route path="/users" element={<Users />} />
          </Routes>
        </>
      ) : (
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  )
}

export default App
