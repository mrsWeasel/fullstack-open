import PropTypes from 'prop-types'
import { Button } from './buttonStyles'
import { FormWrapper, FormInput } from './formStyles'

const LoginForm = ({ handleLogin, handleInputChange, username, password }) => {
  return (
    <FormWrapper>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <FormInput
            type="text"
            id="username"
            value={username || ''}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Password:
          <FormInput
            type="password"
            id="password"
            value={password || ''}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <Button id="submitLogin" type="submit">
          Kirjaudu sisään
        </Button>
      </form>
    </FormWrapper>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
}

export default LoginForm
