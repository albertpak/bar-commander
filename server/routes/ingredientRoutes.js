const express = require('express');
const router  = express.Router();

const ingredientController = require('../controllers/ingredientController.js');

router
    .get('/', ingredientController.list)
    .get('/:id', ingredientController.show)
    .post('/', ingredientController.create)
    .put('/:id', ingredientController.update)
    .delete('/:id', ingredientController.remove);

module.exports = router;