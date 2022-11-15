import axios from 'axios'
const baseUrl = '/api/login'

// Manna Puuronen: manteli / iletnam
const login = async (username, password) => {
  try {
    const response = await axios.post(baseUrl, {
      username,
      password
    })

    if (!response?.data) {
      return { errorMessage : 'response data error' }
    }

    return response.data
  }
  catch (error) {
    const data = { errorMessage : error?.code }
    return data
  }

}

const loginService = {
  login
}

export default loginService