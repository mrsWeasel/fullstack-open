import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const Blog = ({ blog, handleDelete }) => {
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    setLikes(blog?.likes ?? 0)
  }, [blog])

  const handleAddLike = async () => {
    console.log('liked', blog?.title, likes)
    setLikes(0)
    const updatedBlog = { ...blog, likes }
    const data = await blogService.likeBlog(updatedBlog)

    if (!data || data.likes === undefined) {
      console.log('data error')
      return
    }
    
    if (data.errorMessage) {
      console.log(data.errorMessage)
    }

    setLikes(data.likes)
  }

  return (
    <div style={{ border: '1px solid rgba(0,0,0,0.2)', padding: 16, marginBottom: 8 }}>
      {blog.title} | {blog.author}
      <Togglable buttonLabel='View'>
        <ul>
          <li>Url: <a href={blog.url}>{blog.url}</a></li>
          <li>Likes: {likes} <button onClick={handleAddLike}>Like</button></li>
          {blog?.user?.name && <li>User: {blog.user.name}</li>}
        </ul>
        <button style={{ background: 'tomato', color: 'white' }} onClick={handleDelete}>Remove</button>
      </Togglable>
    </div>
  )
}

export default Blog