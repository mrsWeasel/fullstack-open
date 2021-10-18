import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1/all'

const getAll = (timeout) => {
    return axios.get(baseUrl, {timeout})
}

const countryService = { getAll }

export default countryService