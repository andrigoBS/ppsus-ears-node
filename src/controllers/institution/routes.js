const express = require('express');
const router = express.Router();

router.use('/views', require('./UserController'));

module.exports = router;
