var express = require('express');
var router = express.Router();
var ingredientController = require('../controllers/ingredientController.js');

/*
 * GET
 */
router.get('/', ingredientController.list);

/*
 * GET
 */
router.get('/:id', ingredientController.show);

/*
 * POST
 */
router.post('/', ingredientController.create);

/*
 * PUT
 */
router.put('/:id', ingredientController.update);

/*
 * DELETE
 */
router.delete('/:id', ingredientController.remove);

module.exports = router;
