import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import { Box, BlogHeading, BlogDetailsList, BlogDetail } from './blogStyles'
import { Button } from './buttonStyles'

const Blog = ({ blog, handleDelete }) => {
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    setLikes(blog?.likes ?? 0)
  }, [blog])

  const handleAddLike = async () => {
    console.log('liked', blog?.title, likes)
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
    <Box>
      <BlogHeading>
        {blog.title} | {blog.author}
      </BlogHeading>
      <Togglable buttonLabel="View">
        <BlogDetailsList>
          <BlogDetail>
            Url: <a href={blog.url}>{blog.url}</a>
          </BlogDetail>
          <BlogDetail>
            Likes: {likes} <Button onClick={handleAddLike}>Like</Button>
          </BlogDetail>
          {blog?.user?.name && <BlogDetail>User: {blog.user.name}</BlogDetail>}
        </BlogDetailsList>
        <Button
          onClick={handleDelete}
          style={{ borderColor: '#BC2B2B', color: '#BC2B2B' }}>
          Remove
        </Button>
      </Togglable>
    </Box>
  )
}

export default Blog
