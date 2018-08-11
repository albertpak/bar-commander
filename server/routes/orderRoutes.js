const express = require('express');
const router  = express.Router();

const orderController = require('../controllers/orderController.js');

router
    .get('/', orderController.list)
    .get('/:id', orderController.show)
    .post('/', orderController.create)
    .put('/:id', orderController.update)
    .delete('/:id', orderController.remove);

module.exports = router;