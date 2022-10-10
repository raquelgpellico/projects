const { models: { User, Book } } = require('data')
const {
    validators: { validateId },
    errors: { NotFoundError }
} = require('commons')

/**
 * 
 * @param {string} userId id from user
 * @param {string} bookId id from book
 * @returns book return
 */

function retrieveBook(userId, bookId) {
    validateId(userId, 'user id')
    validateId(bookId, 'book id')

    return Promise.all([User.findById(userId).lean(), Book.findById(bookId).lean()])
        .then(([user, book]) => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)
            if (!book) throw new NotFoundError(`book with id ${bookId} not found`)


            book.id = book._id.toString()

            delete book._id
            delete book.__v

            book.userId = book.user._id.toString()
            book.userName = book.user.name

            delete book.user

            return book
        })
}


module.exports = retrieveBook