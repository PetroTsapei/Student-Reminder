const GroupModel = require('../models/group');
const UserModel = require('../models/user');
const LessonModel = require('../models/lesson');
const mongoCodes = require('../constants/mongoCodes');
const asyncForEach = require('../helpers/asyncForEach');

exports.post = function (req, res) {
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
};

exports.getAll = async function(req, res) {
  try {
    let results = [];
    let groups = await GroupModel.find();

    await asyncForEach(groups, async item => {
      let { fullName: groupLeader } = item.groupLeader ? await UserModel.findById(item.groupLeader) : { fullName: null };
      let { fullName: groupCurator } = item.groupCurator ? await UserModel.findById(item.groupCurator) : { fullName: null };

      results.push({
        ...item._doc,
        groupLeader,
        groupCurator
      });
    });

    res.json(results);
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.get = function(req, res) {
  if (!req.params.id) {
    return res.status(400).json({ error: 'Missing URL parameter: id' });
  }

  GroupModel.findById(req.params.id)
    .then(async data => {
      if (data) {

        const groupCurator = await UserModel.findById(data.groupCurator);
        const groupLeader = await UserModel.findById(data.groupLeader);

        res.json({
          ...data._doc,
          groupCurator: groupCurator && { value: groupCurator._id, label: groupCurator.fullName },
          groupLeader: groupLeader && { value: groupLeader._id, label: groupLeader.fullName }
        })
      } else res.status(404).json({ message: "Group not found" });
    })
    .catch(err => {
      res.status(500).json(err);
    })
};

exports.put = function(req, res) {
  if (!req.params.id) {
    return res.status(400).json({ error: 'Missing URL parameter: id' });
  }

  GroupModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
    .then(async doc => {
      if (doc) {
        let data = {};

        if (doc.groupLeader) {
          let { fullName } = await UserModel.findById(doc.groupLeader);
          data.groupLeader = fullName;
        }

        if (doc.groupCurator) {
          let { fullName } = await UserModel.findById(doc.groupCurator);
          data.groupCurator = fullName;
        }

        res.json({
          ...doc._doc,
          ...data
        });
      }
      else res.status(404).json({ message: "Group not found" });
    })
    .catch(err => {
      if (err.code === mongoCodes.notRequired) res.status(400).json({ errors: { groupName: { message: "Group with this name already exist" } } });
      else res.status(500).json(err);
    })
};

exports.delete = async function(req, res) {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing URL parameter: id' });
    }

    await UserModel.deleteMany({ group: req.params.id });
    await LessonModel.deleteMany({ group: req.params.id });

    let doc = await GroupModel.findByIdAndRemove(req.params.id);

    if (doc) res.json(doc);
    else res.status(404).json({ message: "Group not found" });

  } catch (error) {
    res.status(500).json({error});
  }
};