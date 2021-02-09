const mongoose = require("mongoose");
require('dotenv').config()

const MONGOURI = process.env.MONGOURI; //running on localhost

const startMongoServer = async () => {
    try {
            await mongoose.connect(MONGOURI, {
                useNewUrlParser: true,useUnifiedTopology: true //this will parse the mongoDB connection string
            });
            console.log("connected to mongo db");
             } 
            catch (error) 
            {
            console.log(error)
            throw error;
             }
        };

module.exports = startMongoServer;
