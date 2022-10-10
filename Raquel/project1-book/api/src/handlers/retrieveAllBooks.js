const { extractUserIdFromAuthorization } = require('./helpers')
 const { retrieveAllBooks } = require('logic')

 module.exports = (req, res) => {
     try {
         const userId = extractUserIdFromAuthorization(req)

         retrieveAllBooks(userId)
             .then(books => res.status(200).json(books))
             .catch(error => res.status(400).json({ error: error.message }))
     } catch (error) {
         res.status(400).json({ error: error.message })
     }
 }

