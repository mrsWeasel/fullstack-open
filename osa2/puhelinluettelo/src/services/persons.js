import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = person => {
    return axios.post(baseUrl, person)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, updatedPerson) => {
    console.log(`${baseUrl}/${id}`)
    return axios.put(`${baseUrl}/${id}`, updatedPerson)
}

export default { getAll, create, remove, update }