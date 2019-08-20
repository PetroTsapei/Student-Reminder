const GroupController = require('../controllers/group');
const bodyValidator = require('../helpers/bodyValidator');
const tokenVerify = require('../helpers/tokenVerify');
const roleVerify = require('../helpers/roleVerify');
const tokenValidate = require('../helpers/tokenValidate');
const express = require('express');
const router = express.Router();

adminVerify = (req, res, next) => roleVerify(req, res, next, 'admin');

router.post('/api/groups', [bodyValidator, tokenVerify, adminVerify, tokenValidate], GroupController.post);
router.get('/api/groups', [tokenVerify, adminVerify, tokenValidate], GroupController.getAll);
router.get('/api/groups/:id', [tokenVerify, adminVerify, tokenValidate], GroupController.get);
router.put('/api/groups/:groupName', [bodyValidator, tokenVerify, adminVerify, tokenValidate], GroupController.put);
router.delete('/api/groups/:groupName', [tokenVerify, adminVerify, tokenValidate], GroupController.delete);

module.exports = router;
