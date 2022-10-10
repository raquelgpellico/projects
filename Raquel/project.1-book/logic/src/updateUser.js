const { models: { User } } = require('data')
const { validators: { validateId } } = require('commons')
const { errors: { NotFoundError } } = require('commons')

/**
 * 
 * @param {string} userId id from user
 * @param {string} name user name
 * @param {string} email  user email 
 * @param {string} password password 
 * 
 * @returns user updated
 */
function updateUser(userId, name, email, password,) {
    validateId(userId, 'user id')

    return User.updateOne({ _id: userId }, { name, email, password })
        .then(result => {
            const { matchedCount } = result

            if (matchedCount === 0)
                throw new NotFoundError(`user with id ${userId} not found`)
        })
}

module.exports = updateUser 