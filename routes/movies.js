const appRouter_movies = (app) => {
    const { check, validationResult } = require('express-validator/check'); // impoerting express validator
    const Genre = require('../models/genres_schema');
    const Movie = require('../models/movies_schema');
    const moment = require('moment')

    ///////////////////////////////////////endpoint to add movie//////////////////////////////////////////////////
    app.post("/add_movie", [
        //validating input using express validator
        check("movie_name", "it's mandatory").not().isEmpty(),
        check("movie_description", "it's mandatory").not().isEmpty(),
        check("release_date", "it's mandatory").isDate(),
        check("genre_name", "it's mandatory").not().isEmpty(),
        check("duration", "it's mandatory").not().isEmpty(),
        check("rating", "it's mandatory").not().isEmpty(),

    ], async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send({ errors: errors.array() });
        }
        const { movie_name, movie_description, release_date, genre_name, duration, rating } = req.body;
        try {
            let movie_name_check = await Movie.findOne({ movie_name });
            //checking the existance of entered movie
            if (movie_name_check) {
                return res.send({ message: "Hey! seems you have already added this movie...please go to update option to change some details" })
            }
            let movie_genre_check = await Genre.findOne({ genre_name });
            //checking the genre name from genre collection
            if (!movie_genre_check) {
                return res.send({ message: "Genre not found in your Genre list.....please add" })
            }
            let new_movie = new Movie({ movie_name, movie_description, release_date, genre_name, duration, rating });
            //saving result
            await new_movie.save().then((result) => {
                return res.send({ message: "movie sucessfully added", result })
            })
        } catch (err) {
            res.send({ message: "oops! something went worng" })
        }
    })


    ////////////////////////////////////////////endpoint to view all movies/////////////////////////////////////////////////
    app.get("/show_movies", async (req, res) => {
        try {
            await Movie.find({}).then((result) => {
                //sending the list of movies as response
                res.send({ message: "your list of movies", result })
            })
        } catch (err) {
            res.send({ message: "something went wrong...." })
        }
    })


    ////////////////////////////////////////endpoint to update movies/////////////////////////////////////////////////////
    app.post("/update_movies", async (req, res) => {
        const movie_name = req.body.movie_name;
        const description_query = req.query.description;
        const released_date_query = req.query.released_date;
        const genre_query = req.query.genre;
        const duration_query = req.query.duration;
        const rating_query = req.query.rating;
        // checking the existance of entered movie in movies collection
        let movie_name_check = await Movie.findOne({ movie_name });
        if (!movie_name_check) {
            return res.send({ message: "oops! couldn't find the movie in the list" })
        }
        try {//updating movie_description
            if (description_query == 'confirm') {
                const new_description = req.body.new_description;
                if (!new_description) {
                    return res.send({ message: "invalid name" })
                }
                await Movie.updateOne({ movie_name: movie_name }, { $set: { movie_description: new_description } })
                //responding with result after updating
                await Movie.findOne({ movie_name }).then((result) => {
                    return res.send({ message: "description updated sucessfully ", result })
                })
            }
            else

                //updating release date
            if (released_date_query == 'confirm') {
                const new_release_date = req.body.new_release_date;
                if (!(moment(new_release_date, "YYYY-MM-DD").isValid())) { //validating entered date using moment module
                    return res.send({ message: "invalid date" })
                }
                await Movie.updateOne({ movie_name: movie_name }, { $set: { release_date: new_release_date } });
                //responding with result after updating
                await Movie.findOne({ movie_name }).then((result) => {
                return res.send({ message: "release date sucessfully updated ", result })
                    })
                }
                else
                    //updating movie genre
                if (genre_query == 'confirm') {
                    const genre_name = req.body.genre;
                    //checking with genre collection
                    let genre_check = await Genre.findOne({ genre_name });
                    if (!genre_check) {
                        return res.send({ message: "oops! this genre is not in your platform" })
                        }
                    if (!genre_name) {
                        return res.send({ message: "invalid input" })
                    }

                    await Movie.updateOne({ movie_name: movie_name }, { $set: { genre: genre_name } });
                    await Movie.findOne({ movie_name }).then((result) => {
                    //responding with result after updating
                        return res.send({ message: "genre sucessfully upated ", result })
                        })
                    }
                    else
                    //updating duration
                    if (duration_query == 'confirm') {
                        const new_duraton = req.body.new_duration;
                        if (!new_duraton) {
                            return res.send({ message: "invalid input" })
                        }
                        await Movie.updateOne({ movie_name: movie_name }, { $set: { duration: new_duraton } });
                        //responding with result after updating
                        await Movie.findOne({ movie_name }).then((result) => {
                            return res.send({ message: "duration sucessfully updated ", result })
                        })
                    }
                    else
                    //updating rating
                    if (rating_query == 'confirm') {
                        const new_rating = req.body.new_rating;
                        if (!new_rating) {
                            return res.send({ message: "invalid input" })
                        }
                        await Movie.updateOne({ movie_name: movie_name }, { $set: { rating: new_rating } });
                        //responding with result after updating
                        await Movie.findOne({ movie_name }).then((result) => {
                                return res.send({ message: "rating sucessfully updated ", result })
                            })
                        }
        }
        catch (err) {
            console.log(err)
            return res.send({ message: "oops! something went wrong" })
        }
    })


    /////////////////////////////////////////endpoint to remove movies ///////////////////////////////////////////////////////
    app.delete("/delete_movie", async (req, res) => {
        const movie_name = req.body.movie_to_be_deleted;
        try {
            let movie_check = await Movie.findOne({ movie_name });
            if (!movie_check) {
                return res.send({ message: "hey! no need to delete.....it's not in your list" });
            }
            //delteting the entered movie after finding it from movie collection
            await Movie.deleteOne({ movie_name: movie_name }).then((result) => {
                res.send({ message: +result.deletedCount + " movie has been deleted" })
            })
        }
        catch (err) {
            res.send(err)
        }
    })
}
module.exports = appRouter_movies;