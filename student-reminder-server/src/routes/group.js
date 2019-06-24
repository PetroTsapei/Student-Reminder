const GroupController = require('../controllers/group');
const bodyValidator = require('../helpers/bodyValidator');
const tokenVerify = require('../helpers/tokenVerify');
const roleVerify = require('../helpers/roleVerify');
const express = require('express');
const router = express.Router();

router.post('/api/group', [bodyValidator, tokenVerify, (req, res, next) => roleVerify(req, res, next, 'admin')], GroupController.post);

module.exports = router;
