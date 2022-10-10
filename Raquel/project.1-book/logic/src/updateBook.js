const { models: { User, Book } } = require('data')
const { validators: { validateId, validateNumber } } = require('commons')
const { errors: { NotFoundError, AuthError } } = require('commons')


/**
 * 
 * @param {string} userId id from user
 * @param {string} bookId id from book
 * @param {number} isbn unique book identifier  
 * @param {string} title title of book
 * @param {string} description description of book
 * @param {string} category categoryof book
 * @param {boolean} public always true
 * @returns update book
 * 
 */
function updateBook(userId, bookId, isbn, title, description, category) {
    validateNumber(isbn, 'isbn')
    validateId(userId, 'userId')

    return Promise.all([User.findById(userId), Book.findById(bookId)])
        .then(([user, book]) => {
            if (!user) throw new AuthError(`User with id ${userId} not found`)
            if (!book) throw new AuthError(`Book with id ${bookId} not found`)

            if (book.user.toString() !== userId) throw new NotFoundError(`User with id ${userId} not authorized to update book with id ${bookId}`)

            book.isbn = isbn
            book.title = title
            book.description = description
            book.category = category


            return book.save()
        })

        .then(book => { })
}


module.exports = updateBook

