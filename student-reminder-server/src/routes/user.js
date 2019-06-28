const UserController = require('../controllers/user');
const bodyValidator = require('../helpers/bodyValidator');
const express = require('express');
const router = express.Router();

router.post('/api/sign_up', bodyValidator, UserController.sign_up);
router.post('/api/sign_in', bodyValidator, UserController.sign_in);
router.post('/api/resend-code/:id', UserController.resend);
router.post('/api/verify/:id', UserController.verify);

module.exports = router;