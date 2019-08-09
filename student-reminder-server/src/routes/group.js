const GroupController = require('../controllers/group');
const bodyValidator = require('../helpers/bodyValidator');
const tokenVerify = require('../helpers/tokenVerify');
const roleVerify = require('../helpers/roleVerify');
const express = require('express');
const router = express.Router();

adminVerify = (req, res, next) => roleVerify(req, res, next, 'admin');

router.post('/api/groups', [bodyValidator, tokenVerify, adminVerify], GroupController.post);
router.get('/api/groups', [tokenVerify, adminVerify], GroupController.getAll);
router.get('/api/groups/:groupId', [tokenVerify, adminVerify], GroupController.get);
router.put('/api/groups/:groupName', [bodyValidator, tokenVerify, adminVerify], GroupController.put);
router.delete('/api/groups/:groupName', [tokenVerify, adminVerify], GroupController.delete);

module.exports = router;
