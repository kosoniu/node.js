const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/userModel');

exports.postAcceptedMovie = (req, res, next) => {
    const movieId = req.body.movieId;
    const userId = req.body.userId;

    User
        .findById(userId)
        .then(user => {
            return user.addToAccepted(userId);
        })
        .then(result => console.log(result))
        .catch(error => console.log(error));
};