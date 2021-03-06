const SubjectModel = require('../models/subject');
const LessonModel = require('../models/lesson');
const mongoCodes = require('../constants/mongoCodes');

exports.post = function(req, res) {
  let model = new SubjectModel(req.body);

  model.save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }

      res.status(201).json({
        message: "Subject created",
        subject_info: doc
      });
    })
    .catch(err => {
      if (err.code === mongoCodes.notRequired) res.status(400).json({ errors: { name: { message: "Subject with this name already exist" } } });
      else res.status(500).json(err);
    })
};

exports.put = function(req, res) {
  if (!req.params.id) {
    return res.status(400).json({ error: 'Missing URL parameter: id' });
  }

  SubjectModel.findOneAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true
  })
    .then(doc => {
      if (doc) res.json(doc);
      else res.status(404).json({ message: "Subject not found" });
    })
    .catch(err => {
      if (err.code === mongoCodes.notRequired) res.status(400).json({ error: "Subject already exist" });
      else res.status(500).json(err)
    })
};

exports.getAll = function(req, res) {
  const resPerPage = 10;
  const page = +req.query.page || 1;

  SubjectModel
    .find()
    .skip((resPerPage * page) - resPerPage)
    .limit(resPerPage)
    .then(doc => {
      SubjectModel.countDocuments()
        .then(count => {
          res.json({
            subjects: doc,
            currentPage: page,
            pages: Math.ceil(count / resPerPage),
            count
          })
        })
    })
    .catch(err => {
      res.status(500).json(err);
    })
};

exports.delete = function(req, res) {
  if (!req.params.id) {
    return res.status(400).json({ error: 'Missing URL parameter: id' });
  }

  SubjectModel.findOneAndRemove({
    _id: req.params.id
  })
    .then(async doc => {
      if (doc) {
        await LessonModel.deleteMany({ subject: doc._id });

        res.json(doc);
      }
      else res.status(404).json({ message: "Subject not found" });
    })
    .catch(err => {
      res.status(500).json(err)
    })
};
