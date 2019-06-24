const UserController = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.post('/api/sign_up', UserController.sign_up);
router.post('/api/sign_in', UserController.sign_in);

module.exports = router;
