const express = require('express');
const router  = express.Router();

const RestaurantController = require('../controllers/restaurantController.js');

router
    .get('/', RestaurantController.list)
    .get('/:id', RestaurantController.show)
    .post('/', RestaurantController.create)
    .put('/:id', RestaurantController.update)
    .delete('/:id', RestaurantController.remove);

module.exports = router;