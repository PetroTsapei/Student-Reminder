const UserModel = require('../models/user');
const mongoCodes = require('../constants/mongoCodes');
const tokenVerify = require('../helpers/tokenVerify');
const roleVerify = require('../helpers/roleVerify');
const jwt = require('jsonwebtoken');
const encrypt = require('../helpers/encrypt');

exports.sign_up = function (req, res) {
  if (req.body.password) req.body.password = encrypt(req.body.password);
  if (req.body.role === 'admin') {
    tokenVerify(req, res, () => {
      roleVerify(req, res, () => {}, 'admin');
    });
    if (!req.role) return;
  }

  let model = new UserModel(req.body);
  model.save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }

      model.sendAuthyToken(error => {
        if (error) res.status(400).json({ error: error.message });

        res.status(201).json({
          message: "Your account created, please write authentication code",
          user_info: doc
        });
      });
    })
    .catch(err => {
      if (err.code === mongoCodes.notRequired) res.status(400).json({ message: "User already created" });
      else res.status(500).json(err);
    })
};

exports.sign_in = function (req, res) {
  const {
    phoneNumber,
    password
  } = req.body;

  if (!phoneNumber) {
    return res.status(400).send('Phone number is missing');
  }

  if (!password) {
    return res.status(400).send('Password is missing');
  }

  UserModel.findOne({ phoneNumber, password: encrypt(password) })
    .then(doc => {
      if (doc) {
        jwt.sign({ user: doc }, doc.role, (err, token) => {
          if (err) res.status(500).json(err);

          res.json({
            token,
            role: doc.role
          });
        });
      } else res.status(400).json({ message: "Not Found any active account" });
    })
    .catch(err => {
      res.status(500).json(err);
    })
};
