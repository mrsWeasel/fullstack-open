const config = require('./utils/config')
// const http = require('http')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const {requestLogger, unknownEndpoint, errorHandler} = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB', error.message)
    })

const app = express()

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use('/api/blogs', blogRouter)
app.use(errorHandler)
app.use(unknownEndpoint)


module.exports = app