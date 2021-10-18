import { useEffect, useState } from 'react'
import countryService from './services/countries'

const countryList = (filteredCountries) => {
  
  if (filteredCountries.length > 10) {
    return (
      <p>Too many results</p>
    )
  }

  if (filteredCountries) {
    return (
      <ul>
      {
        filteredCountries.map(country => <li key={country.name.common}>{country.name.common}</li>)
      }
    </ul>
    )
  }

  return
}

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  const containerStyles = {
    fontFamily: 'Courier, monospace',
    maxWidth: 320,
    margin: '0 auto',
  }

  const labelStyles = {
    display: 'block',
  }

  const inputStyles = {
    display: 'block',
    width: '100%',
    padding: 8,
    boxSizing: 'border-box',
    marginBottom: 24,
    borderColor: '#333',
    borderWidth: 0,
    borderBottomWidth: 1,
  }

  useEffect(() => {
    countryService
      .getAll(5000)
      .then((response) => {
        setCountries(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleSearch = (event) => {
    console.log(event.target.value)
    const searchString = event.target.value.toLowerCase()

    setFilteredCountries(
      countries.filter((country) =>
        (
          country.altSpellings.join().toLowerCase().includes(searchString) ||
          country.name.common.toLowerCase().includes(searchString)
        )
      )
    )
    console.log(countries.length)
    console.log(filteredCountries.length)
  }

  return (
    <div style={containerStyles}>
      <h1>Find countries</h1>
      <label style={labelStyles}>
        Country name:
        <input
          onChange={(e) => handleSearch(e)}
          style={inputStyles}
          type="text"
        />
      </label>
      <div>
        <h2>Results:</h2>
        
        {countryList(filteredCountries)} 
        
        
      </div>
    </div>
  )
}

export default App
