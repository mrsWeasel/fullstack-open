const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    User.find({})
    .then(users => {
        response.json(users)
    })
    .catch(error => {
        console.log(error.message)
    })
})

usersRouter.post('/', async (request, response) => {
    const { name, username, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    console.log(passwordHash)

    const user = new User({
        name,
        username,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter