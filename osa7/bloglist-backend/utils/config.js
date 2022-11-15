require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : process.env.TEST_MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}