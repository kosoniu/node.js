const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');

router.get('/', movieController.getIndex);

router.get('/get-movie', movieController.getMovie);

router.post('/accepted', movieController.postAcceptedMovie);

router.post('/rejected', movieController.postRejectMovie);

module.exports = router;
