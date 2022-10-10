const { Schema } = require('mongoose');
const { Types: { ObjectId } } = Schema

const review = new Schema({

    book: {
        type: ObjectId,
        ref: 'Book',
        required: true
    },

    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    text: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now,
        required: true
    },

    score: {
        type: Number,
        required: true,
        min : 0,
        max: 5

    }

})

module.exports = review;

