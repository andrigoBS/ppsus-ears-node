const express = require('express');
const router = express.Router();
const swaggerFile = require('../../docAutoGen/swaggerOutput.json');
const swaggerUI = require("swagger-ui-express");

router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

router.use('/admin', require('./admin/routes'));
router.use('/institution', require('./institution/routes'));
router.use('/researchers', require('./researchers/routes'));
router.use('/site', require('./site/routes'));
router.use('/therapist', require('./therapist/routes'));

module.exports = router;
