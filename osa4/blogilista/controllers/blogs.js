const blogRouter = require('express').Router()
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

module.exports = blogRouter