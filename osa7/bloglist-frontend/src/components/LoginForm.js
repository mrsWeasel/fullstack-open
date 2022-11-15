import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleInputChange,
  username,
  password,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <label>
          Username:
        <input type='text' id='username' value={username || ''} onChange={handleInputChange} />
      </label>

      <label>
          Password:
        <input type='password' id='password' value={password || ''} onChange={handleInputChange} />
      </label>

      <input id='submitLogin' type='submit' />
    </form>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
}

export default LoginForm