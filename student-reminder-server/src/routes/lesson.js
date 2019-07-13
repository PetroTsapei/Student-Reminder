const LessonController = require('../controllers/lesson');
const tokenVerify = require('../helpers/tokenVerify');
const bodyValidator = require('../helpers/bodyValidator');
const roleVerify = require('../helpers/roleVerify');
const groupVerify = require('../helpers/getGroupName');
const setCurrentRole = require('../helpers/setCurrentRole');
const express = require('express');
const router = express.Router();

adminVerify = (req, res, next) => roleVerify(req, res, next, 'admin');

router.post('/api/lessons', [tokenVerify, bodyValidator, adminVerify], LessonController.post);
router.get('/api/lessons', [tokenVerify, groupVerify], LessonController.getAll);

module.exports = router;