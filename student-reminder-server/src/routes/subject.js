const SubjectController = require('../controllers/subject');
const bodyValidator = require('../helpers/bodyValidator');
const tokenVerify = require('../helpers/tokenVerify');
const roleVerify = require('../helpers/roleVerify');
const express = require('express');
const router = express.Router();

adminVerify = (req, res, next) => roleVerify(req, res, next, 'admin');

router.post('/api/subjects', [tokenVerify, bodyValidator, adminVerify], SubjectController.post);
router.put('/api/subjects/:id', [tokenVerify, bodyValidator, adminVerify], SubjectController.put);
router.get('/api/subjects', [tokenVerify, roleVerify], SubjectController.getAll);
router.delete('/api/subjects/:id', [tokenVerify, adminVerify], SubjectController.delete);

module.exports = router;