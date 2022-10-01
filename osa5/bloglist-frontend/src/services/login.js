import axios from 'axios'
const baseUrl = '/api/login'

// Manna Puuronen: manteli / iletnam
const login = async (username, password) => {
    try {
        const data = await axios.post(baseUrl, {
            username,
            password
        })

        return data
    }
    catch (error) {
        const data = {error}
        return data
    }

}

const loginService = {
    login
}

export default loginService