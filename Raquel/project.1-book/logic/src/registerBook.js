const { models: { User, Book } } = require('data')
const {
    validators: { validateId, validateString, validateNumber },
    errors: { NotFoundError }
} = require('commons')

/**
 * 
 * @param {string} userId  
 * @param {number} isbn unique book identifier
 * @param {string} title title of book
 * @param {string} description description of book
 * @param {string} category categoryof book
 * @param {boolean} public always true
 * @returns book registered
 */
function registerBook(userId, isbn, title, description, category, public = true) {
    validateId(userId, 'user id')
    validateString(title, 'title')
    validateString(description, 'description')
    validateString(category, 'category')
    validateNumber(isbn, "isbn")

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            return Book.create({ user: userId, isbn, title, description, category })
        })
        .then(book => { })
}

module.exports = registerBook