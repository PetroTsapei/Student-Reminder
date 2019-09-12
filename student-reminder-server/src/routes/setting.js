const SettingController = require('../controllers/setting');
const tokenVerify = require('../helpers/tokenVerify');
const tokenValidate = require('../helpers/tokenValidate');
const bodyValidator = require('../helpers/bodyValidator');
const roleVerify = require('../helpers/roleVerify');
const setSetting = require('../helpers/setSetting');
const setCurrentRole = require('../helpers/setCurrentRole');
const express = require('express');
const router = express.Router();

adminVerify = (req, res, next) => roleVerify(req, res, next, 'admin');

router.post('/api/settings', [tokenVerify, bodyValidator, adminVerify, tokenValidate], SettingController.post);
router.put('/api/settings', [tokenVerify, adminVerify, tokenValidate, setSetting], SettingController.put);
router.get('/api/settings', [tokenVerify, setCurrentRole, setSetting, tokenValidate], SettingController.get);

module.exports = router;