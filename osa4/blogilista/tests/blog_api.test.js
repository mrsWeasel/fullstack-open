const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { listWithOneBlog, listWithFiveBlogs } = require('./test_data')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let i = 0; i < listWithFiveBlogs.length; i++) {
        let blogObject = new Blog(listWithFiveBlogs[i])
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api  
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are 6 blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(5)
})

test('blogs have "id" field', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('blog can be added', async () => {
    let newBlog = new Blog(listWithOneBlog[0])
    await newBlog.save()

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
})

test('if likes are not defined, default to 0', async () => {
    let blogWithoutLikes = Object.assign(listWithOneBlog[0])
    delete blogWithoutLikes.likes

    let newBlog = new Blog(blogWithoutLikes)
    
    await newBlog.save()

    const response = await api.get('/api/blogs')
    expect(response.body[5].likes).toBe(0)
})

afterAll(() => {
    mongoose.connection.close()
})