const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { listWithOneBlog, listWithSixBlogs } = require('./test_data')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let i = 0; i < listWithSixBlogs.length; i++) {
        let blogObject = new Blog(listWithSixBlogs[i])
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
    expect(response.body).toHaveLength(6)
})

test('blogs have "id" field', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('blog can be added', async () => {
    let newBlog = new Blog(listWithOneBlog)
    await newBlog.save()

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(7)
})

afterAll(() => {
    mongoose.connection.close()
})