const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();


// MIDDLEWARE PERSONALIZADO
// router.param('id', tourController.checkID);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getALLTours);

router
  .route('/')
  .get(tourController.getALLTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
