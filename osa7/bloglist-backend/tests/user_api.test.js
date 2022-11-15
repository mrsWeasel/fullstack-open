const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

describe('when one user exists in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('salasana', 10)
        const user = new User({ name : 'Possu', username : 'possuli', passwordHash})

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const newUser = {
            name : 'Kassu',
            username: 'kassuli',
            password: 'kalasana',
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)

        const users = await api.get('/api/users')
        const fetchedUser = users.body[1]
        delete fetchedUser.id

        expect(fetchedUser).toMatchObject({name : 'Kassu', username : 'kassuli'})
    })

    test('creation fails with non valid username', async () => {
        const newUser = {
            name : 'Kassu',
            username: 'k',
            password: 'kalasana',
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('creation fails with non valid password', async () => {
        const newUser = {
            name : 'Kassu',
            username: 'kassuli',
            password: 'k',
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('creation fails with existing username', async () => {
        const newUser = {
            name : 'Kassu',
            username: 'possuli',
            password: 'kalasana',
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})