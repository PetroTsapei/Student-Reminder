const ScheduleModel = require('../models/schedule');
const SettingModel = require('../models/setting');
const LessonModel = require('../models/lesson');
const UserModel = require('../models/user');
const SubjectModel = require('../models/subject');
const asyncForEach = require('../helpers/asyncForEach');
const sendPushWithExpo = require('../helpers/sendPushWithExpo');
const schedule = require('node-schedule');
require('../helpers/weekOfMonth');

function provideSchedule(req, doc) {
  const {
    dayOfWeek,
    startTime
  } = doc;

  schedule.scheduleJob(
    String(doc._id),
    { hour: new Date(startTime).getHours(), minute: new Date(startTime).getMinutes(), dayOfWeek },
    async function () {
      const setting = await SettingModel.findById(req.setting);
      if (doc.typeOfTime !== setting.typeOfTime) return;

      let lessons = await LessonModel.find({ schedule: doc._id });

      await asyncForEach(lessons, async el => {
        if (el.weekOfMonth === new Date().getWeekOfMonth()) {
          let users = await UserModel.find({ group: el.group });
          let { name } = await SubjectModel.findById(el.subject);
          let { fullName } = await UserModel.findById(el.teacher);
          let pushTokens = [];

          users.forEach(user => user.pushToken && pushTokens.push(user.pushToken));

          if (pushTokens.length) sendPushWithExpo(pushTokens, {
            body: `The lecture on ${name} will begin soon, teacher - ${fullName}`,
            sound: 'default'
          });
        }
      })
    }
  );
}

exports.post = function(req, res) {
  let model = new ScheduleModel(req.body);

  model.save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }

      provideSchedule(req, doc);

      res.status(201).json({
        message: "Schedule created",
        schedule_info: doc
      });
    })
    .catch(err => {
      res.status(500).json(err);
    })
};

exports.getAll = async function(req, res) {
  const resPerPage = 10;
  const page = +req.query.page || 1;

  const setting = await SettingModel.findById(req.setting);

  ScheduleModel
    .find({ typeOfTime: setting.typeOfTime })
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

  ScheduleModel.findOneAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true
  })
    .then(doc => {
      if (doc) {
        let notification_job = schedule.scheduledJobs[String(doc._id)];
        if (notification_job) notification_job.cancel();

        provideSchedule(req, doc);

        res.json(doc);
      }
      else res.status(404).json({ message: "Schedule not found" });
    })
    .catch(err => {
      res.status(500).json(err)
    })
};

exports.delete = function(req, res) {
  if (!req.params.id) {
    return res.status(400).json({ error: 'Missing URL parameter: id' });
  }

  ScheduleModel.findOneAndRemove({
    _id: req.params.id
  })
    .then(async doc => {
      if (doc) {
        let notification_job = schedule.scheduledJobs[String(doc._id)];
        if (notification_job) notification_job.cancel();

        await LessonModel.deleteMany({ schedule: doc._id });

        res.json(doc);
      }
      else res.status(404).json({ message: "Schedule not found" });
    })
    .catch(err => {
      res.status(500).json(err)
    })
};
