const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');

exports.sign_up = function (req, res) {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }

  let model = new UserModel(req.body);
  model.save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }

      res.status(201).send(doc);
    })
    .catch(err => {
      res.status(500).json(err);
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

  UserModel.findOne({ phoneNumber, password })
    .then(doc => {
      if (doc) {
        const role = doc.isAdmin ? 'admin' : doc.isTeacher ? 'teacher' : 'student';

        jwt.sign({ user: doc }, role, (err, token) => {
          if (err) res.status(500).json(err);

          res.json({
            token,
            role
          });
        });

        res.json(doc);
      } else res.status(400).json({ message: "Not Found any active account" });
    })
    .catch(err => {
      res.status(500).json(err);
    })
};
