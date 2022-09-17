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
    let newBlog = listWithOneBlog[0]
    
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
})

test('if likes are not defined, default to 0', async () => {

    const blogWithoutLikes = {
        title: "How to survive the modern world of dating",
        author: "Daisy Duck",
        url: "http://www.daisyduck.com",
    }

    await api
        .post('/api/blogs')
        .send(blogWithoutLikes)
        .expect(201)

    const response = await api.get('/api/blogs')
    expect(response.body[5].likes).toBe(0)
})

test('if title field is missing, respond with 400 bad request', async () => {
    const blogWithoutTitle = {
        author: "Duck Avenger",
        url: "http://www.duckaveger.com",
        likes: 8,
    }

    await api
        .post('/api/blogs')
        .send(blogWithoutTitle)
        .expect(400)

})

afterAll(() => {
    mongoose.connection.close()
})