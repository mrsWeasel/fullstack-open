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

        <input type='submit' />
      </form>
    )
  }

  export default LoginForm