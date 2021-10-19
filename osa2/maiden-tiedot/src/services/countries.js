import axios from 'axios'

// sää-apin endpoint
const getCityWeather = (city, timeout) => {
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`, {timeout})
}

// maa-apin endpoint
const countriesBaseUrl = 'https://restcountries.com/v3.1/all'

const getAll = (timeout) => {
    return axios.get(countriesBaseUrl, {timeout})
}

const countryService = { getAll, getCityWeather }

export default countryService