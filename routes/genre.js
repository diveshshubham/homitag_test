const appRouter_genre = (app)=>{
    const { check, validationResult } = require('express-validator'); // impoerting express validator
    const Genre = require('../models/genres_schema');


    ////////////////////////////////////////////endpoint to add genre////////////////////////////////////////
    app.post("/add_genre", [
        check("genre_name", "it's mandatory").not().isEmpty(),       //validating musician_name
        check("genre_description", "it's mandatory").not().isEmpty(),        //validating musician_type
    ], async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send({ errors: errors.array() });
        }

        const { genre_name, genre_description } = req.body;
        try {
            let genre = await Genre.findOne({genre_name}); // searching existing musician name

            if (genre) {
                return res.send({ message: "Hey! this genre is already added....you can update it :) " })
            }

            new_genre = new Genre({ genre_name,genre_description });
            await new_genre.save().then((Result) => {
                res.send({ message: "Bingo! Genre sucessfully added", Result });  //saving to mongo and sending saved data as a response
            })
        }
        catch (err) {
            return res.send({ message: "oops! something went wrong" })
        }
    })


    /////////////////////////////////////endpoint to show all genre/////////////////////////////////////////
    app.get("/show_all_genre",async(req,res)=>{
        await Genre.find({}).then((result)=>{
            res.send({message:"Here is the list of all Genres - ",result})
        })
    })


    ////////////////////////////////endpoint to update genre/////////////////////////////////////////////
    app.post("/update_genre",async(req,res)=>{
        const genre_name = req.body.genre_to_be_updated;
        const genre_description = req.body.genre_description;
        try{
        if(genre_name&&genre_description){
            let genre_check = await Genre.findOne({genre_name});
            if(!genre_check){
                return res.send({message:"Hmmmmm! I tried searching...but I think you haven't added this in your list :( "});
            }
            await Genre.updateOne({ genre_name: genre_name }, { $set: { genre_description: genre_description } });
            await Genre.findOne({genre_name}).then((result)=>{
                return res.send({message:"sucessfully updated",result})
            })
        }
    }catch(err){
        return res.send({message:"oops!something went wrong"})
    }
    })


    /////////////////////////////////////endpoint to remove genre///////////////////////////////////////////////
    app.delete("/remove_genre",async(req,res)=>{
        const genre_name = req.body.genre_name;
        await Genre.deleteOne({genre_name:genre_name}).then((result)=>{
            res.send({message:+result.deletedCount+ " document has been deleted"})
        })
    })


}
module.exports = appRouter_genre;
