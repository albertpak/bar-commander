const express = require('express');
const router  = express.Router();

const userController = require('../controllers/userController.js');

router
    .get('/', userController.list)
    .get('/:id', userController.show)
    .post('/', userController.create)
    .put('/:id', userController.update)
    .delete('/:id', userController.remove);

module.exports = router;