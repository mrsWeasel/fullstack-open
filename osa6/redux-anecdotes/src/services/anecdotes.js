import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response?.data
}

const getOne = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    console.log(response?.data)
    return response?.data
}

const createAnecdote = async (content) => {
    const anecdote = {content, votes: 0 }
    const response = await axios.post(baseUrl, anecdote)
    return response?.data
}

const voteAnecdote = async (id) => {
    const anecdote = await getOne(id)
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote)
    return response?.data
}

const anecdoteService = {
    getAll,
    getOne,
    createAnecdote,
    voteAnecdote,
}

export default anecdoteService