const express = require('express');
const router  = express.Router();

const ProductController = require('../controllers/productController.js');

router
    .get('/', ProductController.list)
    .get('/:id', ProductController.show)
    .post('/', ProductController.create)
    .put('/:id', ProductController.update)
    .delete('/:id', ProductController.remove);

module.exports = router;