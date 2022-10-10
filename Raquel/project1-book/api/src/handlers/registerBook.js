const { registerBook } = require("logic")
const { extractUserIdFromAuthorization } = require('./helpers')
const { errors: { DuplicityError, FormatError } } = require('commons')



module.exports = (req, res) => {
    try {

        const userId = extractUserIdFromAuthorization(req)

        const { body: { isbn, title, description, category, public } } = req

        registerBook(userId, isbn, title, description, category, public)
            .then(() => res.status(201).send())
            .catch(error => {
                let status = 500

                if (error instanceof DuplicityError)
                    status = 409

                res.status(status).json({ error: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof TypeError || error instanceof FormatError)
            status = 400

        res.status(status).json({ error: error.message })
    }
}