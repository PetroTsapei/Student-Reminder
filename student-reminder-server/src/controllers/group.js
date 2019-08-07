const GroupModel = require('../models/group');
const UserModel = require('../models/user');
const mongoCodes = require('../constants/mongoCodes');
const asyncForEach = require('../helpers/asyncForEach');
const jwt = require('jsonwebtoken');

exports.post = function (req, res) {
  jwt.verify(req.token, req.role, err => {
    if (err) {
      res.sendStatus(403);
    } else {
      let model = new GroupModel(req.body);

      model.save()
        .then(doc => {
          if (!doc || doc.length === 0) {
            return res.status(500).send(doc);
          }

          res.status(201).json({
            message: "Group created",
            group_info: doc
          });
        })
        .catch(err => {
          if (err.code === mongoCodes.notRequired) res.status(400).json({ errors: { groupName: { message: "Group with this name already exist" } } });
          else res.status(500).json(err);
        })
    }
  });
};

exports.getAll = function(req, res) {
  jwt.verify(req.token, req.role, async err => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let results = [];
        let groups = await GroupModel.find();

        await asyncForEach(groups, async item => {
          let { fullName: groupLeader } = await UserModel.findById(item.groupLeader);
          let { fullName: groupCurator } = await UserModel.findById(item.groupCurator);

          results.push({
            ...item._doc,
            groupLeader,
            groupCurator
          });
        })
        
        res.json(results);
      } catch(err) {
        res.status(500).json(err);
      }
    }
  })
}

exports.get = function(req, res) {
  if (!req.params.groupName) {
    return res.status(400).json({ error: 'Missing URL parameter: groupName' });
  }

  jwt.verify(req.token, req.role, err => {
    if (err) {
      res.sendStatus(403);
    } else {
      GroupModel.findOne({
        groupName: req.params.groupName
      })
        .then(doc => {
          if (doc) {
            res.json(doc)
          } else res.status(404).json({ message: "Group not found" });
        })
        .catch(err => {
          res.status(500).json(err);
        })
    }
  })
}

exports.put = function(req, res) {
  if (!req.params.groupName) {
    return res.status(400).json({ error: 'Missing URL parameter: groupName' });
  }

  jwt.verify(req.token, req.role, err => {
    if (err) {
      res.sendStatus(403);
    } else {
      GroupModel.findOneAndUpdate({
        groupName: req.params.groupName
      }, req.body, {
        new: true
      })
        .then(doc => {
          if (doc) res.json(doc);
          else res.status(404).json({ message: "Group not found" });
        })
        .catch(err => {
          res.status(500).json(err)
        })
    }
  })
}

exports.delete = function(req, res) {
  if (!req.params.groupName) {
    return res.status(400).json({ error: 'Missing URL parameter: groupName' });
  }

  jwt.verify(req.token, req.role, err => {
    if (err) {
      res.sendStatus(403);
    } else {
      GroupModel.findOneAndRemove({
        groupName: req.params.groupName
      })
        .then(doc => {
          if (doc) res.json(doc);
          else res.status(404).json({ message: "Group not found" });
        })
        .catch(err => {
          res.status(500).json(err)
        })
    }
  })
}