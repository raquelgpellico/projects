const { models: { User } } = require('data')
const {
    validators: {
        validateEmail,
        validatePassword
    },
    errors: {
        AuthError
    }
} = require('commons')
const bcrypt = require('bcryptjs')


/**
 * 
 * @param {string} email  user email
 * @param {string} password password  
 * 
 * @throws {NoFoundError} When email does not exist in database
 * @throws {AuthError} when email exist but password not macth or user is deactivated
 * 
 * @returns returns id  for token
 */
function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    return User.findOne({ email })
        .then(user => {
            if (!user) throw new AuthError('wrong credentials')

            return bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) throw new AuthError('wrong credentials')

                    return user.id
                })
        })
}

module.exports = authenticateUser