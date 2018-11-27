const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');

const isAuth = require('../middleware/is-auth');

router.get('/movies', isAuth, movieController.getIndex);

router.post('/accepted', isAuth, movieController.postAcceptedMovie);

router.post('/rejected', isAuth, movieController.postRejectMovie);

router.post('/add-movie', isAuth, movieController.postAddMovie);

router.get('/add-movie', isAuth, movieController.getAddMovie);

router.get('/recommendations', movieController.getRecommendations);

module.exports = router;
