const authenticateUser = require('./authenticateUser');
const deleteUser = require('./deleteUser');
const deleteBook = require('./deleteBook');
const registerBook = require('./registerBook');
const registerUser = require('./registerUser');
const retrieveUser = require('./retrieveUser');
const updateBook = require('./updateBook');
const updateUser = require('./updateUser');
const reviewBook = require("./reviewBook");
const deleteReviewBook = require("./deleteReviewBook");
const retrieveBooks = require("./retrieveBooks")
const retrieveBook = require("./retrieveBook")
const retrieveAllBooks = require("./retrieveAllBooks")
const findBook = require("./findBook")

module.exports = {
    authenticateUser,
    deleteUser,
    deleteBook,
    registerBook,
    registerUser,
    retrieveUser,
    updateBook,
    updateUser,
    reviewBook,
    deleteReviewBook,
    retrieveBooks,
    retrieveBook,
    retrieveAllBooks,
    findBook
}
