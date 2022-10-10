const { deleteReviewBook } = require("logic")
const { extractBookIdFromAuthorization } = require("./helpers")

module.exports = (req, res) => {
    try {
        const id = extractBookIdFromAuthorization(req)
        const { body: { password } } = req

        deleteReviewBook(id, password, reviewId)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

