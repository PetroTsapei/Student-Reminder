const UserController = require('../controllers/user');
const GroupModel = require('../models/group');
const bodyValidator = require('../helpers/bodyValidator');
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

router.post('/api/sign_up', [findGroup, bodyValidator], UserController.sign_up);
router.post('/api/sign_in', bodyValidator, UserController.sign_in);
router.post('/api/resend-code/:id', UserController.resend);
router.post('/api/verify/:id', UserController.verify);

module.exports = router;
