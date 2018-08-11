const express = require('express');
const router  = express.Router();
const auth    = require('../helpers/auth')();
const userController = require('../controllers/userController.js');

const isDev = process.env.NODE_ENV === 'development';
const noop  = (req,res,next) => next();

router
    .get('/', isDev ? noop : auth.authenticate(), userController.list)
    .get('/:id', auth.authenticate(), userController.show)
    .post('/', auth.authenticate(), userController.create)
    .put('/:id', auth.authenticate(), userController.update)
    .delete('/:id', auth.authenticate(), userController.remove);

module.exports = router;