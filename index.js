/////////////////////////////////////////express server ///////////////////////////////////

const express = require("express");

var app = express();

var bodyParser = require("body-parser");

const initiateMongo = require('./config/database');

initiateMongo() //starting mongo db

app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({message: "lets! compete Netflix...... :) "}); //default message
});

const genre = require('./routes/genre')(app);

const movie = require('./routes/movies')(app);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8082;



app.listen(port);

console.log("Listening to PORT 8082");