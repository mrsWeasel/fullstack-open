const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request?.body)
    const {token} = request

    if (!token) {
        return response.status(401).json({
            error: 'token missing'
        })
    }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const username = { decodedToken }
        const user = await User.findOne(username)
        blog.user = user.id

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()

        response.status(201).json(savedBlog)
    } catch (error) {
        next(error)
    }
})

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog
            .find({}).populate('user', { name: 1, username: 1 })

        response.json(blogs)
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