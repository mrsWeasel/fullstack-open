import { useEffect, useState } from 'react'
import countryService from './services/countries'
import CountryList from './components/countryList'

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchString, setSearchString] = useState('')

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
      .getAll(10000)
      .then((response) => {
        setCountries(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleSearch = (searchString) => {
    setSearchString(searchString)
    console.log(searchString, 'searchString')
    setFilteredCountries(
      countries.filter((country) =>
        (
          country.altSpellings.join().toLowerCase().includes(searchString) ||
          country.name.common.toLowerCase().includes(searchString)
          
        )
      )
    )
    
    console.log(searchString, filteredCountries.length, countries.length)
  }

  const filterSingle = (country) => {
    
    setFilteredCountries(
      countries.filter((c) =>
        (
          c.name.common === country
          
        )
      )
    )
  }

  return (
    <div style={containerStyles}>
      <h1>Find countries</h1>
      <label style={labelStyles}>
        Country name:
        <input
          onChange={(e) => handleSearch(e.target.value)}
          style={inputStyles}
          type="text"
        />
      </label>
      <div>
        <h2>Results:</h2>
        
        <CountryList searchString={searchString} filteredCountries={filteredCountries} filterSingle={filterSingle}/>
        
      </div>
    </div>
  )
}

export default App
