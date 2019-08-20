const SubjectController = require('../controllers/subject');
const bodyValidator = require('../helpers/bodyValidator');
const tokenVerify = require('../helpers/tokenVerify');
const tokenValidate = require('../helpers/tokenValidate');
const roleVerify = require('../helpers/roleVerify');
const setCurrentRole = require('../helpers/setCurrentRole');
const express = require('express');
const router = express.Router();

adminVerify = (req, res, next) => roleVerify(req, res, next, 'admin');

router.post('/api/subjects', [tokenVerify, bodyValidator, adminVerify, tokenValidate], SubjectController.post);
router.put('/api/subjects/:id', [tokenVerify, bodyValidator, adminVerify, tokenValidate], SubjectController.put);
router.get('/api/subjects', [tokenVerify, setCurrentRole, tokenValidate], SubjectController.getAll);
router.delete('/api/subjects/:id', [tokenVerify, adminVerify, tokenValidate], SubjectController.delete);

module.exports = router;