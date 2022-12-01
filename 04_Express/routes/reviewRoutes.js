const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController')

// Con esta configuración podemos realizar un merge de las rutas usadas (ver linea 13 del tour routes)
const router = express.Router( { mergeParams: true } );
router
    .route('/')
    .get(reviewController.getAllReviews)
    .post(authController.protect, reviewController.createReview);

module.exports = router;
