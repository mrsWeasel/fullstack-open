const blogRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch(error => {
            console.log(error.message)
        })
})

blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => {
            console.log(error.message)
            if (error.message.includes('validation failed')) {
                response.status(400).json(error)
            }
        })
})

blogRouter.delete('/:id', (request, response) => {
    Blog.findByIdAndRemove(request.params.id)
    .then((result) => {
        response.status(204).end()
    })
    .catch(error => {
        console.log(error.message)
    })
})

blogRouter.patch('/:id', (request, response) => {
    const { likes } = request?.body || {}

    const blog = { likes }

    Blog.findByIdAndUpdate(request.params.id, blog, { new : true })
    .then(updatedBlog => {
        response.json(updatedBlog)
    })
    .catch(error => {
        console.log(error)
    })    
})

module.exports = blogRouter