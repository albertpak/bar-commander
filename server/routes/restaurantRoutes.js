var express = require('express');
var router = express.Router();
var RestaurantController = require('../controllers/restaurantController.js');

/*
 * GET
 */
router.get('/', RestaurantController.list);

/*
 * GET
 */
router.get('/:id', RestaurantController.show);

/*
 * POST
 */
router.post('/', RestaurantController.create);

/*
 * PUT
 */
router.put('/:id', RestaurantController.update);

/*
 * DELETE
 */
router.delete('/:id', RestaurantController.remove);

module.exports = router;
