const { updateBook } = require ('logic')
const { extractUserIdFromAuthorization } = require('./helpers')

module.exports = (req, res) => {
try {
    const userId = extractUserIdFromAuthorization(req)

    const { params: { bookId }, body : { isbn, title, description, category } } = req
    
    updateBook(userId, bookId, isbn, title, description, category)
        .then(() => res.status(204).send())
        .catch(error => res.status(400).json({ error: error.message }))

    }catch (error) {
    res.status(400).json({ error: error.message })
}

}

