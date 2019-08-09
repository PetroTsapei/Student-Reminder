const LessonModel = require('../models/lesson');
const GroupModel = require('../models/group');
const ScheduleModel = require('../models/schedule');
const SubjectModel = require('../models/subject');
const UserModel = require('../models/user');
const asyncForEach = require('../helpers/asyncForEach');
const jwt = require('jsonwebtoken');
const sendPushWithExpo = require('../helpers/sendPushWithExpo');

Date.prototype.getWeekOfMonth = function() {
  let firstWeekday = new Date(this.getFullYear(), this.getMonth(), 1).getDay();
  let offsetDate = this.getDate() + firstWeekday - 1;
  return Math.floor(offsetDate / 7);
}

exports.post = function(req, res) {
  jwt.verify(req.token, req.role, err => {
    if (err) {
      res.sendStatus(403);
    } else {
      
      let model = new LessonModel(req.body);

      model.save()
        .then(doc => {
          if (!doc || doc.length === 0) {
            return res.status(500).send(doc);
          }

          ScheduleModel.findById(doc.schedule)
            .then(schedule => {
              console.log(schedule);
            });
          // sendPushWithExpo(['ExponentPushToken[Mvio75Fh88WDjXE8m3hQ4J]'], { body: 'Test', sound: 'default' });

          res.status(201).json({
            message: "Lesson created",
            lesson_info: doc
          });
        })
        .catch(err => {
          res.status(500).json(err);
        })
    }
  })
}

exports.getAll = function(req, res) {
  decodeJWT = jwt.decode(req.token);
  if (decodeJWT) req.role = decodeJWT.user.role;

  jwt.verify(req.token, req.role, async err => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let results = [];

        let { _id: group, groupName } = await GroupModel.findOne({ groupName: req.query.groupName });

        // TODO check that the condition is correct 
        if (group !== req.group) return res.status(403).json({ message: "Don't have access for lessons this group" });

        let lessons = await LessonModel.find({ group });

        await asyncForEach(lessons, async item => {

          const schedule = await ScheduleModel.findById(item.schedule);
          const weekOfMonth = new Date().getWeekOfMonth();

          if (req.query.typeOfTime === schedule.typeOfTime && item.weekOfMonth === weekOfMonth) {
            const subject = await SubjectModel.findById(item.subject);
            const teacher = await UserModel.findById(item.teacher);

            results.push({
              ...item._doc,
              group: groupName,
              subject: subject.name,
              schedule,
              teacher: teacher.fullName
            })
          }
        });

        res.json(results);
      } catch(err) {
        res.status(500).json(err);
      }
    }
  })
}