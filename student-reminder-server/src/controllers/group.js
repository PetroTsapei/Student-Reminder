const GroupModel = require('../models/group');
const mongoCodes = require('../constants/mongoCodes');
const jwt = require('jsonwebtoken');

exports.post = function (req, res) {
  jwt.verify(req.token, req.role, (err, groupData) => {
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
          if (err.code === mongoCodes.notRequired) res.status(400).json({ message: "Group with this name already exist" });
          else res.status(500).json(err);
        })
    }
  });
};
