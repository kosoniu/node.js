const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/login', authController.getLogin);

router.get('/', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/signup', authController.getSignup);

router.post('/signup', authController.postSignup);

router.post('/logout', authController.postLogout);

module.exports = router;
