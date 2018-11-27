const express = require('express');
const mongoose = require('mongoose');

const Movie = require('../models/movieModel');
const User = require('../models/userModel');

exports.getIndex = (req, res, next) => {
    const user = new User(req.user);
    const movieArray = user.clickedMovies;

    User
    .find()
    .then( users => {
        users.forEach(user => {
            user.resetClickedMovies()
            .then()
            .catch();
            //czyszczę tutaj bazę danych, żeby móc po przełądowaniu strony raz jeszcze testować
            //defaultowo nie powinno tego być
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
    const userId = req.body.userId;
    const movieId = req.body.movieId;

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
            if(!movie){
                console.log('END OF LIST!');
                res.status(200).json({
                    "endOfList": true
                });
            }else{
                res.status(200).json(movie);
            }
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
};

exports.postRejectMovie = (req, res, next) => {
    const userId = req.body.userId;
    const movieId = req.body.movieId;

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
            if(!movie){
                console.log('END OF LIST!');
                res.status(200).json({
                    "endOfList": true
                });
            }else{
                res.status(200).json(movie);
            }
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
};

exports.getAddMovie = (req, res, next) => {
    res.render('add-movie', {
        path: '/add-movie',
        pageTitle: 'Add movie'
    });
};

exports.postAddMovie = (req, res, next) => {
    const title = req.body.title;
    const summary = req.body.summary;
    const imageUrl = req.body.imageUrl;
    const rating = req.body.rating;

    const movie = new Movie({
        title: title,
        summary: summary,
        imageUrl: imageUrl,
        rating: rating,
        decision: {
            accepted: [],
            rejected: []
        }
    });
    
    movie.save()
    .then( result => {
        res.redirect('/movies');
    })
    .catch( error => console.log(error));

};

exports.getRecommendations = (req, res, next) => {
    Movie.find()
        .then(movie => {
            res.status(200).json(movie);
    })
    .catch(error => console.log(error));
}




