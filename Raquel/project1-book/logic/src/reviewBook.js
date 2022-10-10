const { models: { User, Book, Review } } = require('data')
const { validators: { validateId } } = require('commons')


function reviewBook(userId, bookId, text, score) {
    validateId(userId, 'userId')
     

    return Promise.all([User.findById(userId), Book.findById(bookId)])
        .then (([user, book]) => {
            if (!user) throw new Error(`User with id ${userId} does not exist`)
            if (!book) throw new Error(`Book with id ${bookId} does not exist`)
            
            const review = new Review({ user: userId, text, score })

            book.reviews.push(review)

            return review.save()
        })
        .then (review => {})

}

module.exports = reviewBook





        //.then(() => User.findById(userId), book.ISBN(ISBN))
        //.then(user => {
           // if (!user) throw new Error('user not found')
         //   return Book.findOne({ ISBN })
       // })
        //.then(book => {
           // if (!book) throw new Error('book not found')
           // return Review.create({
            //    user: userId,
          //      book: book._id,
        //        text,
      //          score
    //        })
  //      })
//}

