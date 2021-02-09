//schema for movie collection
const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    movie_name:{
        type : String,
        required : true
    },
    movie_description:{
        type:String,
        required : true
    },
    release_date:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        require:true
    },
    duration:{
        type:String,
        required:true
    },
    rating :{
        type:String,
        required:true
    },
    createdAt: {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("movie",movieSchema); //export model with movieSchema