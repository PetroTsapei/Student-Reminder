const ScheduleModel = require('../models/schedule');
const jwt = require('jsonwebtoken');

exports.post = function(req, res) {
  jwt.verify(req.token, req.role, err => {
    if (err) {
      res.sendStatus(403);
    } else {
      let model = new ScheduleModel(req.body);

      model.save()
        .then(doc => {
          if (!doc || doc.length === 0) {
            return res.status(500).send(doc);
          }

          res.status(201).json({
            message: "Schedule created",
            schedule_info: doc
          });
        })
        .catch(err => {
          res.status(500).json(err);
        })
    }
  })
};

exports.getAll = function(req, res) {
  jwt.verify(req.token, req.role, err => {
    if (err) {
      res.sendStatus(403);
    } else {
      const resPerPage = 10;
      const page = +req.query.page || 1;

      ScheduleModel
        .find({ typeOfTime: "full" })
        .skip((resPerPage * page) - resPerPage)
        .limit(resPerPage)
        .sort({
          dayOfWeek: 1,
          numberInSchedule: 1,
        })
        .then(doc => {
          ScheduleModel.countDocuments()
            .then(count => {
              res.json({
                schedules: doc,
                currentPage: page,
                pages: Math.ceil(count / resPerPage),
                count
              })
            })
        })
        .catch(err => {
          res.status(500).json(err);
        })
    }
  })
};

exports.get = function(req, res) {
  if (!req.params.scheduleId) {
    return res.status(400).json({ error: 'Missing URL parameter: scheduleId' });
  }

  ScheduleModel.findById(req.params.scheduleId)
    .then(data => {
      if (data) res.json(data);
      else res.status(404).json({ message: "Schedule not found" });
    })
    .catch(err => {
      res.status(500).json(err);
    })
};

exports.put = function(req, res) {
  if (!req.params.id) {
    return res.status(400).json({ error: 'Missing URL parameter: id' });
  }

  jwt.verify(req.token, req.role, err => {
    if (err) {
      res.sendStatus(403);
    } else {
      ScheduleModel.findOneAndUpdate({
        _id: req.params.id
      }, req.body, {
        new: true
      })
        .then(doc => {
          if (doc) res.json(doc);
          else res.status(404).json({ message: "Schedule not found" });
        })
        .catch(err => {
          res.status(500).json(err)
        })
    }
  })
};

exports.delete = function(req, res) {
  if (!req.params.id) {
    return res.status(400).json({ error: 'Missing URL parameter: id' });
  }

  jwt.verify(req.token, req.role, err => {
    if (err) {
      res.sendStatus(403);
    } else {
      ScheduleModel.findOneAndRemove({
        _id: req.params.id
      })
        .then(doc => {
          if (doc) res.json(doc);
          else res.status(404).json({ message: "Schedule not found" });
        })
        .catch(err => {
          res.status(500).json(err)
        })
    }
  })
};