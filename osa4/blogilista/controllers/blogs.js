const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog
            .find({}).populate('user', { name: 1, username: 1 })

        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

blogRouter.post('/', async (request, response, next) => {
    try {
        const blog = new Blog(request.body)

        const users = await User.find({})
        const user = users.length > 0 ? users[0] : {}
        blog.user = user.id

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()

        response.status(201).json(savedBlog)
    } catch (error) {
        next(error)
    }
})

blogRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
        .then((result) => {
            response.status(204).end()
        })
        .catch(error => {
            next(error)
        })
})

blogRouter.patch('/:id', (request, response, next) => {
    const { likes } = request?.body || {}

    const blog = { likes }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => {
            next(error)
        })
})

module.exports = blogRouter