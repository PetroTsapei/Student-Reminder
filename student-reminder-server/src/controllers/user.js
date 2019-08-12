const UserModel = require('../models/user');
const GroupModel = require('../models/group');
const mongoCodes = require('../constants/mongoCodes');
const tokenVerify = require('../helpers/tokenVerify');
const roleVerify = require('../helpers/roleVerify');
const jwt = require('jsonwebtoken');
const encrypt = require('../helpers/encrypt');
const emailValidator = require("email-validator");

exports.sign_up = function (req, res) {
  if (req.body.password) req.body.password = encrypt(req.body.password);
  if (req.body.role === 'admin') {
    tokenVerify(req, res, () => {
      roleVerify(req, res, () => {}, 'admin');
    });
    if (!req.role) return;
  }

  if (!emailValidator.validate(req.body.email)) return res.status(400).json({ error: "Invalid email" });

  let model = new UserModel(req.body);
  model.save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }

      model.sendAuthyToken(async error => {
        // if (error) res.status(400).json({ error: error.message });

        if (doc.role === 'student' && req.body.groupLeader) {
          await GroupModel.findByIdAndUpdate(doc.group, { groupLeader: doc._id });
          doc._doc.groupLeader = true;
        }

        res.status(201).json({
          message: "Your account created, please write authentication code",
          user_info: doc
        });
      });
    })
    .catch(err => {
      if (err.code === mongoCodes.notRequired) res.status(400).json({ error: "User with this email already created" });
      else res.status(500).json(err);
    })
};

exports.sign_in = function (req, res) {
  const {
    countryCode,
    phone,
    password
  } = req.body;

  if (!countryCode) return res.status(400).json({error: 'countryCode is missing'});
  if (!phone) return res.status(400).json({error: 'phone is missing'});
  if (!password) return res.status(400).json({error: 'Password is missing'});

  UserModel.findOne({ countryCode, phone, password: encrypt(password) })
    .then(doc => {
      if (doc) {
        doc = doc.toObject();
        jwt.sign({ user: doc }, doc.role, (err, token) => {
          if (err) res.status(500).json(err);

          if (!doc.verified) {
            res.json({
              id: doc._id,
              verified: doc.verified
            });

          } else {
            res.json({
              token,
              role: doc.role,
              verified: doc.verified,
              ...( doc.role === 'student' ? { groupName: doc.groupName } : {})
            });
          }
        });
      } else res.status(400).json({ error: "Not Found any active account" });
    })
    .catch(err => {
      res.status(500).json(err);
    })
};

exports.resend = function(req, res) {
  UserModel.findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).json({ error: "Not Found any active account" });

      user.sendAuthyToken(postSend);

      function postSend(error) {
        if (error) return res.status(400).json({ error });

        res.json({ message: "Code re-send" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message || err });
    })
}

exports.verify = function(req, res) {
  let user = {};

  UserModel.findById(req.params.id)
    .then(doc => {
      if (!user) return res.status(404).json({ error: "Not Found any active account" });

      user = doc;
      user.verifyAuthyToken(req.body.code, postVerify);

      function postVerify(err) {
        if (err) return res.status(400).json({ error: "The code you entered was invalid - please retry" });

        user.verified = true;
        user.save(postSave);
      }

      function postSave(err) {
        if (err) return res.status(400).json({ error: 'There was a problem validating your account - please enter your token again' });

        user.sendMessage("You did it! Signup complete :)", function() {

          jwt.sign({ user }, user.role, (err, token) => {
            if (err) res.status(500).json(err);
            
            res.status(200).json({
              token,
              role: user.role,
              verified: user.verified
            });
          });
        }, function(err) {
          console.log(err);
          res.status(400).json({ error: "You are signed up, but we could not send you a message. Our bad" });
        })
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message || err });
    })
}

exports.pushToken = function(req, res) {
  decodeJWT = jwt.decode(req.token);
  if (decodeJWT) req.role = decodeJWT.user.role;

  jwt.verify(req.token, req.role, async err => {
    if (err) {
      res.sendStatus(403);
    } else {
      UserModel.findByIdAndUpdate(decodeJWT.user._id, {
        $set: { pushToken: req.body.pushToken }
      })
        .then(doc => {
          if (doc) res.json(doc);
          else res.status(404).json({ error: "User not found" });
        })
        .catch(err => {
          res.status(500).json(err)
        })
    }
  })
}

exports.students = async function(req, res) {
  try {
    const group = await GroupModel.findById(req.params.groupId);

    if (group) {
      let result = await UserModel.find({ group: group._id }, '-__v -password -role -pushToken');

      if (group.groupLeader) {
        result.map(e => e._id == group.groupLeader.toString() && (e._doc.groupLeader = true));
      }

      res.json({
        result,
        groupName: group.groupName
      });
    } else res.status(404).json({ error: "Group not found" });

  } catch(error) {
    res.status(500).json({ error: error.message });
  }
}