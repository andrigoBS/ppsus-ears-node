const express = require('express');
const router = express.Router();
const HttpStatus = require('../../helpers/HttpStatus');

router.get('/', function(req, res, next) {
  res.status(HttpStatus.ok).send({message: 'respond with a resource'});
});

module.exports = router;
