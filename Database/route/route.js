const express = require('express');
const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    id: Number,
    name: String,
    realeaseDate: String,
    poster_url: String,
    IMDB: Number,
})
    
const Movie = mongoose.model('Movie', movieSchema);

const userRouter = express.Router();

userRouter.get('/movie', getMovies);
userRouter.get('/movie/:title', getMovieByTitle);
userRouter.get('/movie/:rating', getMovieByRating);
userRouter.get('/movies', searchMovies);

module.exports = userRouter;


async function getMovies(req, res) {
    try {
        let { skip, limit, sortBy, sortType } = req.query;
        let movies = await Movie.find().sort({[sortType]:sortBy}).skip(skip).limit(limit);
        res.status(200).send({
            data : movies
        });
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function getMovieByTitle(req, res) {
    try {
        let title = req.params.title;
        let movie = await Movie.find({name: title});
        res.status(200).send({
            data : movie
        });
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function getMovieByRating(req, res) {
    try {
        let rating = req.params.rating;
        let movies = await Movie.find({IMDB: rating});
        res.status(200).send({
            data : movies
        });
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function searchMovies(req, res) {
    try {
        let { q } = req.query;
        let movies = await Movie.find({name: {$regex: q}});
        res.status(200).send({
            data : movies
        });
    } catch (error) {
        return res.status(500).send(error);
    }
}