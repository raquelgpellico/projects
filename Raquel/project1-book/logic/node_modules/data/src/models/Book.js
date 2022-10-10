const { model } = require('mongoose')
const { book } = require('../schemas')

const Book = model ('Book', book)

module.exports = Book