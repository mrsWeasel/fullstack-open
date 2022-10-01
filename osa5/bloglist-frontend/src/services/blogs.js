import axios from 'axios'
const baseUrl = '/api/blogs'

const setToken = (newToken) => {

  const token = `Bearer ${newToken}`
  return token
}

const getAllBlogs = async () => {
  try {
    const response = await axios.get(baseUrl)

    if (!response?.data) {
      return { errorMessage: 'response data error' }
    }

    return response.data
  }
  catch (error) {
    const data = { errorMessage: error?.code }
    return data
  }
}

const createBlog = async (blog) => {
  const userJSON = window.localStorage.getItem('loggedInBlogUser')
  const user = JSON.parse(userJSON)
  const token = setToken(user.token)

  const config = {
    headers: {
      authorization: token
    }
  }

  try {
    const response = await axios
      .post(baseUrl, blog, config)

    if (!response?.data) {
      return { errorMessage: 'response data error' }
    }
    return response.data

  }
  catch (error) {
    const data = { errorMessage: error?.code }
    return data
  }
}

const likeBlog = async (blog) => {
  const updatedBlog = {...blog, likes: blog.likes + 1}
  const userJSON = window.localStorage.getItem('loggedInBlogUser')
  const user = JSON.parse(userJSON)
  const token = setToken(user.token)

  const config = {
    headers: {
      authorization: token
    }
  }
  const url = baseUrl + '/' + blog.id
  try {
    const response = await axios  
      .patch(url, updatedBlog, config)

      if (!response?.data) {
        return { errorMessage: 'response data error' }
      }
      console.log(response.data)
      return response.data
  }
  catch (error) {
    const data = { errorMessage: error?.code }
    return data
  }
 
}

const blogService = {
  setToken,
  getAllBlogs,
  createBlog,
  likeBlog,
}

export default blogService