import { useState, useEffect } from "react"
import countryService from "../services/countries"

const SingleCountry = ({country}) => {
      const [weather, setWeather] = useState({})  

      const languages = country.languages
      const flag = country.flags.png
      const capital = country.capital[0]

      const ulStyles = {
        paddingLeft : 16,
        marginBottom: 32
    }


      useEffect(() => {
        countryService
          .getCityWeather(capital, 10000)
          .then((response) => {
            
            const data = response.data
            console.log(data)
            setWeather({ data })
          })
          .catch((error) => {
            console.log(error)
          })
      }, [capital])
      
      let languageList = []

      for (const key in languages) {
         languageList.push(languages[key])
      }

      const weatherIsSet = (weather && weather.data) ? true : false
      if(weatherIsSet) console.log(weather)

    return (
        <div>
              <h3>{country.name.common}</h3>
              <p>Capital: {capital}</p>
              <p>Population: {country.population}</p>
              <h4>Languages</h4>
              <ul style={ulStyles}>
                 {
                     languageList.map(lang => <li key={lang}>{lang}</li>)
                 }
              </ul>
              <img style={{ border : '1px solid #dbdbdb' }} width='100' alt='' src={flag}/>
              { weatherIsSet &&
                <>
                    <h4>Weather in {capital}</h4>
                    <p><span style={{fontSize : '1.5rem'}}>{Math.round(weather.data.main.temp)} °C</span> {weather.data.weather[0].description}</p>
                    <img width='60' alt='' src={`http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} />
                    
                </>
              }
          </div>
    )
}

export default SingleCountry