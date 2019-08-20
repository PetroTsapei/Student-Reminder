const LessonController = require('../controllers/lesson');
const tokenVerify = require('../helpers/tokenVerify');
const tokenValidate = require('../helpers/tokenValidate');
const bodyValidator = require('../helpers/bodyValidator');
const roleVerify = require('../helpers/roleVerify');
const groupVerify = require('../helpers/getGroupName');
const setCurrentRole = require('../helpers/setCurrentRole');
const express = require('express');
const router = express.Router();

adminVerify = (req, res, next) => roleVerify(req, res, next, 'admin');

router.post('/api/lessons', [tokenVerify, bodyValidator, adminVerify], LessonController.post);
router.get('/api/lessons', [tokenVerify, groupVerify, setCurrentRole, tokenValidate], LessonController.getAllByGroup);
router.get('/api/lessons/all', [tokenVerify, adminVerify, tokenValidate], LessonController.getAll);
router.get('/api/lessons/:id', [tokenVerify, setCurrentRole, tokenValidate], LessonController.getById);
router.put('/api/lessons/:id', [tokenVerify, adminVerify, tokenValidate], LessonController.put);

module.exports = router;