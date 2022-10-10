const { models: { User } } = require('data')
const {
    validators: { validateId, validatePassword },
    errors: { NotFoundError, AuthError } }
    = require('commons')
const bcrypt = require('bcryptjs')


/**
 * 
 * @param {string} userId id from user
 * @param {string} password password
 * @returns delete book
 */
function deleteUser(userId, password) {
    validateId(userId, 'user id')
    validatePassword(password)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            //if (user.password !== password) throw new AuthError('wrong credentials')
            return bcrypt.compare(password, user.password)
        })
        .then(match => {
            if (!match) throw new AuthError('wrong credentials')

            return User.deleteOne({ _id: userId })
        })
        .then(result => {
            const { deletedCount } = result

            if (deletedCount === 0)
                throw new Error(`could not delete user with id ${userId}`)
        })
}

module.exports = deleteUser
