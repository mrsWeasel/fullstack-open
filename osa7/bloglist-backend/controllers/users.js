const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id)
    response.json(user)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
    })
    response.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const { name, username, password } = request.body

    // check that username does not exist
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      const err = {
        name: 'ValidationError',
        message: 'Username must be unique',
      }
      next(err)
    }

    // validate password
    if (password.length < 3) {
      const err = {
        name: 'ValidationError',
        message: 'Password does not meet requirements',
      }
      next(err)
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      name,
      username,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
