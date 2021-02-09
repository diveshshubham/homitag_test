//schema for genre collection
const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
    genre_name:{
        type : String,
        required : true
    },
    genre_description:{
        type:String,
        required : true
    },

    createdAt: {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("genre",genreSchema); //export model with genreSchema