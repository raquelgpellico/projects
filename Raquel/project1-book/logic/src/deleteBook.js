const { models: { User, Book } } = require("data")
const { validators: { validateId }, errors: { AuthError } } = require('commons')


/**
 * 
 * @param {string} userId id from user 
 * @param {string} bookId id from book
 * @returns delete book
 */

function deleteBook(userId, bookId) {
    validateId(userId, 'user id')


    return Promise.all([User.findById(userId), Book.findById(bookId)])
        .then(([user, book]) => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)
            if (!book) throw new NotFoundError(`book with id ${bookId} not found`)

            if (book.user.toString() !== userId) throw new AuthError(`book with id ${bookId} does not belong to user with id ${userId}`)

            return Book.deleteOne({ _id: bookId })
        })
        .then(() => { })
}

module.exports = deleteBook