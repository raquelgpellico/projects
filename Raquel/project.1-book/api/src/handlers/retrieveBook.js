const { extractUserIdFromAuthorization } = require('./helpers')
const { retrieveBook } = require('logic')
// const { errors: { AuthError, NotFoundError, TypeError, FormatError } } = require('commons')


module.exports = (req, res) => {
    try {

        const userId = extractUserIdFromAuthorization(req)

        const { params: { bookId } } = req

        retrieveBook(userId, bookId)
            .then(books => res.status(200).json(books))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })

    }

}
