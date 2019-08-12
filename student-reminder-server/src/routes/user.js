const UserController = require('../controllers/user');
const GroupModel = require('../models/group');
const UserModel = require('../models/user');
const bodyValidator = require('../helpers/bodyValidator');
const tokenVerify = require('../helpers/tokenVerify');
const setCurrentRole = require('../helpers/setCurrentRole');
const tokenValidate = require('../helpers/tokenValidate');
const express = require('express');
const router = express.Router();

function findGroup(req, res, next) {
  GroupModel.findById(req.body.group)
    .then(doc => {
      if (!doc && req.body.group) res.status(400).json({errors: { group: { message:  "Group not found" } } });
      else next();
    })
    .catch(error => res.status(500).json({error}));
}

function validatePhone(req, res, next) {
  UserModel.find({ countryCode: req.body.countryCode })
    .then(doc => {
      if (doc.filter(el => el.phone === req.body.phone).length) return res.status(400).json({ error: "User with this phone already exit" });
      else next();
    })
    .catch(error => res.status(500).json({error}));
}

router.post('/api/sign_up', [findGroup, bodyValidator, validatePhone], UserController.sign_up);
router.post('/api/sign_in', bodyValidator, UserController.sign_in);
router.post('/api/resend-code/:id', UserController.resend);
router.post('/api/verify/:id', UserController.verify);
router.post('/api/push-token', [tokenVerify], UserController.pushToken);
router.get('/api/students/:groupId', [tokenVerify, setCurrentRole, tokenValidate], UserController.students);

module.exports = router;
