const express = require('express');
const mongoose = require('mongoose');

const Movie = require('../models/movieModel');
const User = require('../models/userModel');

exports.getIndex = (req, res, next) => {
    const user = new User(req.user);
    const movieArray = user.clickedMovies;

    Movie.find({
        _id: {
            $nin: movieArray
        }
    })
    .countDocuments()
    .then( counter => {
        let movieIndex = Math.floor(Math.random() * counter);

        Movie.find({
            _id: {
                $nin: movieArray
            }
        })
        .then( movies => {
            movie = movies[movieIndex];

            // console.log(movieArray);

            return res.render('index', {
                movie: movie,
                pageTitle: 'Tinder for movies',
                movieId: movie ? movie._id.toString() : undefined,
                userId: req.user._id.toString(),
                path: '/',
            });
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log( error ));
};

exports.getMovie = (req, res, next) => {
    const user = new User(req.user);
    const movieArray = user.clickedMovies;

    Movie
    .find({
        _id: {
            $nin: movieArray
        }
    })
    .countDocuments()
    .then(counter => {
        let movieIndex = Math.floor(Math.random() * counter);

        Movie.find({
                _id: {
                    $nin: movieArray
                }
            })
            .then(movies => {
                movie = movies[movieIndex];

                console.log(movieArray);

                res.status(200).json(movie);
            })
            .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
};

exports.postAcceptedMovie = (req, res, next) => {
    const movieId = req.body.movieId;
    const userId = req.body.userId;

    User
    .findById(userId)
    .then( user => {
        user.addToClicked(movieId);
    })
    .catch(error => console.log(error));

    Movie
    .findById(movieId)
    .then(movie => {
        return movie.addToAccepted(userId);
    })
    .then()
    .catch(error => console.log(error));
};

exports.postRejectMovie = (req, res, next) => {
    const movieId = req.body.movieId;
    const userId = req.body.userId;

    User
        .findById(userId)
        .then(user => {
            user.addToClicked(movieId);
        })
        .catch(error => console.log(error));

    Movie
        .findById(movieId)
        .then(movie => {
            return movie.addToRejected(userId);
        })
        .then()
        .catch(error => console.log(error));
};




