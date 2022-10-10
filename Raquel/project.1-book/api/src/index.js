require('dotenv').config()

const { mongoose: { connect } } = require('data')
const express = require('express')
const cors = require('cors')
const {
  authenticateUser,
  deleteBook,
  deleteReviewBook,
  deleteUser,
  registerUser,
  registerBook,
  retrieveBooks,
  retrieveUser,
  reviewBook,
  updateBook,
  updateUser,
  retrieveBook,
  retrieveAllBooks,
  findBook
  
} = require("./handlers")


const { env: { MONGODB_URL, PORT } } = process

connect(MONGODB_URL)
  .then(() => {
    console.log("Database connected")

    const api = express()

    api.use(cors())

    const router = express.Router()

    const jsonBodyParser = express.json()

    router.post('/user', jsonBodyParser, registerUser)
    router.post('/user/auth', jsonBodyParser, authenticateUser)
    router.get('/user', retrieveUser)
    router.patch('/user', jsonBodyParser, updateUser)
    router.delete('/user', jsonBodyParser, deleteUser)

    router.post('/book', jsonBodyParser, registerBook)
    router.get('/books', retrieveBooks)
    router.get('/books/public', retrieveAllBooks)
    router.get('/books/find', findBook)
    router.get('/books/:bookId', retrieveBook)
    router.delete('/books/:bookId', deleteBook)
    router.patch('/books/:bookId', jsonBodyParser, updateBook)


    router.post('/review', jsonBodyParser, reviewBook)
    router.delete('/review', jsonBodyParser, deleteReviewBook)

    api.use('/api', router)

    api.listen(PORT, () => console.log(`server listening on port ${PORT}`))

  })