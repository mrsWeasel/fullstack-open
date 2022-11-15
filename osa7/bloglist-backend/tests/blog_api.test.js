const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { listWithOneBlog, listWithFiveBlogs } = require('./test_data')
const { login } = require('./helpers')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const passwordHash = await bcrypt.hash('pass', 10)
    const user = new User({ name: 'Tina Tester', username: 'test', passwordHash })
    await user.save()

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
    const token = await login(api)
    let newBlog = listWithOneBlog[0]

    await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(201)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
})

test('if likes are not defined, default to 0', async () => {
    const token = await login(api)

    const blogWithoutLikes = {
        title: "How to survive the modern world of dating",
        author: "Daisy Duck",
        url: "http://www.daisyduck.com",
    }

    await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(blogWithoutLikes)
        .expect(201)

    const response = await api.get('/api/blogs')
    expect(response.body[5].likes).toBe(0)
})

test('if title field is missing, respond with 400 bad request', async () => {
    const token = await login(api)

    const blogWithoutTitle = {
        author: "Duck Avenger",
        url: "http://www.duckaveger.com",
        likes: 8,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(blogWithoutTitle)
        .expect(400)

})

test('blog cannot be deleted without token', async () => {
    await api
        .delete('/api/blogs/5a422bc61b54a676234d17fc')
        .expect(401)

    // const response = await api.get('/api/blogs')
    // expect(response.body).toHaveLength(4)  

})

test('blog can be deleted with valid token', async () => {
    const token = await login(api)
    let newBlog = {
        title: "Jest is at its best at api testing",
        author: "Anonymous",
        url: "http://www.jest.com",
        likes: 3,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(201)

    const addedBlog = await Blog.findOne({author: "Anonymous"})
    const {id} = addedBlog    

    await api
        .delete(`/api/blogs/${id}`)
        .set('Authorization', token)
        .expect(204)
})

test('blog can be updated', async () => {
    await api
        .patch('/api/blogs/5a422bc61b54a676234d17fc')
        .send({ likes: 25 })
    
    const updatedBlog = await Blog.findById('5a422bc61b54a676234d17fc')
    expect(updatedBlog.likes).toBe(25)  
})

afterAll(() => {
    mongoose.connection.close()
})