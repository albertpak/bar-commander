const express = require('express');
const router  = express.Router();

const authController = require('../controllers/authController.js');

router
    .post('/token', authController.token);

module.exports = router;