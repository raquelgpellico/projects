const { findBook } = require('logic')
const { extractUserIdFromAuthorization } = require('./helpers')

module.exports = (req, res) => {

    try {
        const { query: { q } } = req
        const userId = extractUserIdFromAuthorization(req)

        findBook(userId, q)
            .then(books => res.status(200).send(books))

            .catch(error => res.status(400).json({ error: error.message }))

    } catch (error) {
        res.status(400).json({ error: error.message })
    }


}