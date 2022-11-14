import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }  

  const props = {
    type,
    value,
    onChange
  }

  return {
      props, 
      reset
    }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl)
    .then((data) => {
      if (!data?.data) throw new Error('Data error')
      setResources(data.data)
    })
    .catch(error => {
      console.log(error.message)
    })
  }, [baseUrl])

  const create = (resource) => {
    axios.post(baseUrl, resource)
    .then((data) => {
      setResources(resources.concat(resource))
      return data
    })
    .catch(error => {
      console.log(error.message)
    })
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.props.value })
    content.reset()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.props.value, number: number.props.value})
    name.reset()
    number.reset()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.props} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={`${n.id}${n.content}`}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name.props} /> <br/>
        number <input {...number.props} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={`${n.id}${n.name}`}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App