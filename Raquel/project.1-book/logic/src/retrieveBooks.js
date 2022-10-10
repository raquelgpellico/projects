const { models: { User, Book } } = require('data')
const {
  validators: { validateId },
  errors: { NotFoundError }
} = require('commons')


/**
 * 
 * @param {sring} userId is from user
 * @returns retrive books
 */
function retrieveBooks(userId) {
  validateId(userId, 'user id')

  return User.findById(userId)
    .then(user => {
      if (!user) throw new NotFoundError(`user with id ${userId} not found`)

      return Book.find({ user: userId }).lean().populate('user').sort('-date')
    })
    .then(books => {
      books.forEach(book => {
        book.id = book._id.toString()

        delete book._id
        delete book.__v

        book.userId = book.user._id.toString()
        book.userName = book.user.name

        delete book.user



      })

      return books
    })
}

module.exports = retrieveBooks