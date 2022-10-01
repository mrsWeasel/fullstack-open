import { useState } from 'react'

const CreateBlogForm = ({ handleCreateBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        console.log(title, author, url)
        handleCreateBlog({
            title,
            author,
            url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    const handleInputChange = (event) => {
        const { id, value } = event?.target || {}
        switch (id) {
            case 'title': return setTitle(value)
            case 'author': return setAuthor(value)
            case 'url': return setUrl(value)
            default: return null
        }
    }

    return (
            <>
            <h3>Create new blog</h3>
            <form onSubmit={addBlog}>
                <label>
                    Title:
                    <input type='text' id='title' value={title || ''} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Author:
                    <input type='text' id='author' value={author || ''} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Url:
                    <input type='text' id='url' value={url || ''} onChange={handleInputChange} />
                </label>
                <br />
                <input type='submit' />
            </form>
            </>
    )
}

export default CreateBlogForm