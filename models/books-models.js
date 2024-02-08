const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        requried: true
    },
    publisher: {
        type: String,
        requried: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Book", bookSchema);