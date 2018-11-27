const express = require('express');
const mongoose = require('mongoose');

const Movie = require('../models/movieModel');
const User = require('../models/userModel');

exports.getIndex = (req, res, next) => {
    const user = new User(req.user);
    const movieArray = user.clickedMovies;

    console.log(user.clickedMovies);

    User
    .find()
    .then( users => {
        users.forEach(user => {
            // console.log(user);

            user.resetClickedMovies()
            .then()
            .catch();
        });
    })
    .catch( error => console.log(error));

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

            movies.forEach(movie => {
                movie.resetDecisions()
                .then()
                .catch();
            });

            movie = movies[movieIndex];

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

exports.postAcceptedMovie = (req, res, next) => {
    const user = new User(req.user);
    const userId = req.body.userId;
    const movieId = req.body.movieId;

    console.log(user.clickedMovies);

    Movie
    .findById(movieId)
    .then(movie => {
        return movie.addToAccepted(userId);
    })
    .then()
    .catch(error => console.log(error));

    User
    .findById(userId)
    .then( user => {
        return user.addToClicked(movieId);
    })
    .then( result => {
        Movie.find({
            _id: {
                $nin: result.clickedMovies
            }
        })
        .cursor()
        .next()
        .then(movie => {
            // movie = movies[movieIndex];
    
            if(!movie){
                console.log('END OF LIST!');
                res.status(200).json({
                    "endOfList": true
                });
            }else{
                // console.log('\n\n\n');
                // console.log(movie);
                res.status(200).json(movie);
            }
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
};

exports.postRejectMovie = (req, res, next) => {
    const user = new User(req.user);
    const userId = req.body.userId;
    const movieId = req.body.movieId;

    console.log(user.clickedMovies);

    Movie
    .findById(movieId)
    .then(movie => {
        return movie.addToRejected(userId);
    })
    .then()
    .catch(error => console.log(error));

    User
    .findById(userId)
    .then( user => {
        return user.addToClicked(movieId);
    })
    .then( result => {
        Movie.find({
            _id: {
                $nin: result.clickedMovies
            }
        })
        .cursor()
        .next()
        .then(movie => {
            // movie = movies[movieIndex];
    
            if(!movie){
                console.log('END OF LIST!');
                res.status(200).json({
                    "endOfList": true
                });
            }else{
                // console.log('\n\n\n');
                // console.log(movie);
                res.status(200).json(movie);
            }
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
};




