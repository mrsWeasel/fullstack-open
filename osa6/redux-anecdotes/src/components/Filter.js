import { changeFilter } from "../reducers/filterReducer"
import { connect } from 'react-redux'

const Filter = ({changeFilter}) => {

    const handleChange = (event) => {
      const input = event?.target?.value
      console.log(input)
      changeFilter(input)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

  const mapDispatchToProps = {
    changeFilter
  }
  
  export default connect(null, mapDispatchToProps)(Filter)