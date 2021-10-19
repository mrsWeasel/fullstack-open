import SingleCountry from './singleCountry'

const CountryList = ({ searchString, filteredCountries, filterSingle }) => {
  const ulStyles = {
    paddingLeft: 0,
  }

  const liStyles = {
    paddingTop: 8,
    paddingBottom: 8,
    borderBottom: '1px solid #dbdbdb',
    width: '100%',
    display: 'flex',
  }

  const listTextStyles = {
    alignSelf: 'flex-start',
    flex: '1 1 auto',
  }

  const buttonStyles = {
    alignSelf: 'flex-end',
    flex: '0 1 auto',
  }

  if (!filteredCountries) return null

  if (!searchString) return null

  if (filteredCountries.length === 0) {
    return <p>No matches</p>
  }

  if (filteredCountries.length === 1) {
    return <SingleCountry country={filteredCountries[0]} />
  }

  if (filteredCountries.length > 10) {
    return <p>Too many matches, continue typing</p>
  }

  return (
    <ul style={ulStyles}>
      {filteredCountries.map((country) => (
        <li style={liStyles} key={country.name.common}>
          <span style={listTextStyles}>{country.name.common}</span>
          <button
            style={buttonStyles}
            onClick={() => {
              filterSingle(country.name.common)
            }}
          >
            Details
          </button>
        </li>
      ))}
    </ul>
  )
}

export default CountryList
