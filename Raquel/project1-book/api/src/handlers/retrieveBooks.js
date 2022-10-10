const { extractUserIdFromAuthorization } = require('./helpers')
const { retrieveBooks } = require('logic')
//const { errors: { AuthError, NotFoundError, TypeError, FormatError } } = require('commons')


module.exports = (req, res) =>{
try {
    
    const userId = extractUserIdFromAuthorization(req)

    retrieveBooks(userId)
        .then (books => res.status (200).json (books))
        .catch(error => res.status (400).json ({error: error.message}))
} catch (error) {
    res.status(400).json ({ error: error.message})
    
}


}
//module.exports = (req, res) => {
  //  try {
    //    const userId = extractUserIdFromAuthorization(req)


      //  retrieveBook(bookId, userId)
        //    .then(book => res.json(book))
          //  .cath(error => {
            //    let status = 500

              //  if (error instanceof AuthError)
                //    status = 401
               // else if (error instanceof NotFoundError)
                //    status = 404

               // res.status(status).json({ error: error.message })

            //})

    //} catch (error) {
       // let status = 500

//        if (error instanceof TypeError || error instanceof FormatError)
  //          status = 400

    //    res.status(status).json({ error: error.message })
   // }
//}