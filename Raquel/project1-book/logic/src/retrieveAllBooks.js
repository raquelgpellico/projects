const { models: { User, Book } } = require('data')
const { validators: { validateId } } = require('commons')


/**
 * 
 * @param {string} userId id from user 
 * @returns retrieve all books
 */
function retrieveAllBooks(userId) {
    validateId(userId, 'user id')


    return User.findById(userId)
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            return Book.find({ public: true }).lean().populate('user').sort('-date')
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

module.exports = retrieveAllBooks


