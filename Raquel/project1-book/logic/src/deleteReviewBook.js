const { models: { User, Book, Review } } = require ("data");
const { validators : { validateId } } = require ("commons");
const { errors : { NotFoundError } } = require ("commons");

function deleteReviewBook ( userId, bookId, reviewId) {
    validateId(userId);
    //validateId(ISBN);
    validateId(reviewId);

    return Promise.all ([ User.findById (userId), Book.findById (bookId), Review.findById (reviewId) ])
        .then (([ user, book, review ]) => {
            if (!user) {    
                throw new NotFoundError ("user with is ${userId} not found");
            }
            if (!book) {
                throw new NotFoundError ("book with is ${userId} not found");
            }
            if (!review) {
                throw new NotFoundError ("review with is ${userId} not found");
            }
            if (user.id !== book.userId) {
                throw new NotFoundError ("wrong credentials");
            }
            if (user.id !== review.userId) {
                throw new NotFoundError ("wrong credentials");
            }
            return Review.deleteOne ({ _id: reviewId })
        })
        .then (() => {} )
}

module.exports =  deleteReviewBook 