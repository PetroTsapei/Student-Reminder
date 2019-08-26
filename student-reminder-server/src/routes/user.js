const UserController = require('../controllers/user');
const GroupModel = require('../models/group');
const UserModel = require('../models/user');
const bodyValidator = require('../helpers/bodyValidator');
const tokenVerify = require('../helpers/tokenVerify');
const setCurrentRole = require('../helpers/setCurrentRole');
const roleVerify = require('../helpers/roleVerify');
const tokenValidate = require('../helpers/tokenValidate');
const emailValidator = require('email-validator');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

adminVerify = (req, res, next) => roleVerify(req, res, next, 'admin');

function validateEmail(req, res, next) {
  if (!emailValidator.validate(req.body.email)) return res.status(400).json({ error: "Invalid email" });
  else next();
}

function findGroup(req, res, next) {
  GroupModel.findById(req.body.group)
    .then(doc => {
      if (!doc && req.body.group) res.status(400).json({errors: { group: { message:  "Group not found" } } });
      else next();
    })
    .catch(error => res.status(500).json({error}));
}

function validatePhone(req, res, next) {
  UserModel.find({ countryCode: req.body.countryCode, _id: { $ne: req.params.id } })
    .then(doc => {
      if (doc.filter(el => el.phone === req.body.phone).length) return res.status(400).json({ error: "User with this phone already exist" });
      else next();
    })
    .catch(error => res.status(500).json({error}));
}

function setUserId(req, res, next) {
  let decodeJWT = jwt.decode(req.token);

  if (decodeJWT) req.id = decodeJWT.user._id;
  next();
}

router.post('/api/sign_up', [findGroup, bodyValidator, validatePhone, validateEmail, tokenVerify], UserController.sign_up);
router.post('/api/sign_in', bodyValidator, UserController.sign_in);
router.post('/api/resend-code/:id', UserController.resend);
router.post('/api/verify/:id', UserController.verify);
router.post('/api/push-token', [tokenVerify, setCurrentRole, tokenValidate, setUserId], UserController.pushToken);
router.delete('/api/push-token', [tokenVerify, setCurrentRole, tokenValidate, setUserId], UserController.deletePushToken);
router.get('/api/students/:groupId', [tokenVerify, setCurrentRole, tokenValidate], UserController.students);
router.get('/api/deep-link-validate/:userId', UserController.deepLinkValidate);
router.put('/api/finish-registration/:userId', UserController.finishRegistration);
router.get('/api/teachers', [tokenVerify, setCurrentRole, tokenValidate], UserController.getTeachers);
router.get('/api/curators', [tokenVerify, setCurrentRole, tokenValidate], UserController.getCurators);
router.delete('/api/users/:id', [tokenVerify, adminVerify, tokenValidate], UserController.delete);
router.put('/api/users/:id', [tokenVerify, adminVerify, tokenValidate, validatePhone, validateEmail], UserController.update);

module.exports = router;
