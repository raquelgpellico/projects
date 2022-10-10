const { models: { User, Book } } = require('data')
const { errors: { NotFoundError } } = require('commons')


/**
 * 
 * @param {*} query 
 * @returns 
 */
function findBook(userId, query) {
    // validateString(query, 'query')

    // const keywords = query.split(' ') 
    
 
    // keywords.forEach(keyword => {
    //     const re = new RegExp(keyword, 'i')
        
    //     matchings.push({ title: re })
    //     matchings.push({ description: re })
    //     matchings.push({ type: re })
      
    

    const criteria = { $or: query } 

    return User.findById(userId)
    .then(user => {
        if (!user) throw new Error(`user with id ${userId} not found`)
        
        return Book.find(criteria).lean().sort('-date')
    })
        .then((books) => {

            if (books.length === 0) throw new NotFoundError('books not found')
            
            return books.map(book => {
                book.id = book._id.toString()

                delete book._id
                delete book.__v

                return book
            })
        })

    }
    
module.exports = findBook