const express = require('express');
const router = express.Router();

router.use('/users', require('./UserController'));

module.exports = router;
