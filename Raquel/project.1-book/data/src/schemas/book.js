const { Schema } = require('mongoose');
const { Types: { ObjectId } } = Schema;


const book = new Schema({

    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    isbn:{
        type: Number,
        required: true,
        unique: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    public:{
        type: Boolean,
        default: true
    }

   
   });

module.exports =  book 
