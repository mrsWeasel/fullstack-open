import blogService from "../services/blogs"
import Togglable from "./Togglable"

const Blog = ({blog}) => (
  <div style={{ border: '1px solid rgba(0,0,0,0.2)', padding: 16, marginBottom: 8}}>
    {blog.title} | {blog.author}
    <Togglable buttonLabel='View'>
      <ul>
        <li>Url: <a href={blog.url}>{blog.url}</a></li>
        <li>Likes: {blog.likes} <button>Like</button></li>
        {blog?.user?.name && <li>User: {blog.user.name}</li>}
      </ul>
      
    </Togglable>
  </div>  
)

export default Blog