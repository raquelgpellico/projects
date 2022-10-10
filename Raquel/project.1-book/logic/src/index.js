const authenticateUser = require('./authenticateUser');
const deleteBook = require('./deleteBook');
const deleteReviewBook = require('./deleteReviewBook');
const deleteUser = require('./deleteUser');
const registerBook = require('./registerBook');
const registerUser = require('./registerUser');
const retrieveBooks = require('./retrieveBooks');
const retrieveUser = require('./retrieveUser');
const updateBook = require('./updateBook');
const updateUser = require('./updateUser');
const reviewBook = require('./reviewBook');
const retrieveBook = require('./retrieveBook');
const retrieveAllBooks = require("./retrieveAllBooks");
const findBook = require("./findBook");

module.exports = {
    authenticateUser,
    deleteBook,
    deleteReviewBook,
    deleteUser,
    registerBook,
    registerUser,
    retrieveBooks,
    retrieveUser,
    updateBook,
    updateUser,
    reviewBook,
    retrieveBook,
    retrieveAllBooks,
    findBook
}