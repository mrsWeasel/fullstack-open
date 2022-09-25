const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response, error) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch(error => {
            next(error)
        })
})

blogRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => {
            next(error)
        })
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

    Blog.findByIdAndUpdate(request.params.id, blog, { new : true })
    .then(updatedBlog => {
        response.json(updatedBlog)
    })
    .catch(error => {
        next(error)
    })    
})

module.exports = blogRouter