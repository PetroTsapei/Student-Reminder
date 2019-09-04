const LessonModel = require('../models/lesson');
const GroupModel = require('../models/group');
const ScheduleModel = require('../models/schedule');
const SubjectModel = require('../models/subject');
const UserModel = require('../models/user');
const asyncForEach = require('../helpers/asyncForEach');
const moment = require('moment');

Date.prototype.getWeekOfMonth = function() {
  let countMonths = moment(`${new Date().getFullYear()}-09-01`).diff(moment(new Date()), 'week');

  return countMonths || 1
};

exports.post = async function(req, res) {
  try {
    let model = new LessonModel(req.body);
    const doc = await model.save();

    if (!doc || doc.length === 0) {
      return res.status(500).send(doc);
    }

    const schedule = await ScheduleModel.findById(doc.schedule);
    const subject = await SubjectModel.findById(doc.subject);
    const teacher = await UserModel.findById(doc.teacher);
    const group = await GroupModel.findById(doc.group);

    res.status(201).json({
      message: "Lesson created",
      lesson_info: {
        ...doc._doc,
        schedule,
        group: group.groupName,
        subject: subject.name,
        teacher: teacher.fullName
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getAllByGroup = async function(req, res) {
  try {
    let results = [];

    let { _id: group, groupName } = await GroupModel.findById(req.query.group);

    if (req.role === 'student' && String(group) !== req.group) return res.status(403).json({ message: "Don't have access for lessons this group" });

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
};

exports.getAll = async function (req, res) {
  try {
    let results = [];
    let lessons = await LessonModel.find();

    await asyncForEach(lessons, async item => {
      const subject = await SubjectModel.findById(item.subject);
      const teacher = await UserModel.findById(item.teacher);
      const group = await GroupModel.findById(item.group);
      const schedule = await ScheduleModel.findById(item.schedule);

      results.push({
        ...item._doc,
        group: group.groupName,
        subject: subject.name,
        schedule,
        teacher: teacher.fullName
      })
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({error});
  }
};

exports.put = async function (req, res) {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing URL parameter: id' });
    }

    const result = await LessonModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (result) {
      const subject = await SubjectModel.findById(result.subject);
      const schedule = await ScheduleModel.findById(result.schedule);
      const group = await GroupModel.findById(result.group);
      const teacher = await UserModel.findById(result.teacher);

      res.json({
        ...result._doc,
        subject: subject.name,
        schedule,
        group: group.groupName,
        teacher: teacher.fullName,
      });
    } else res.status(404).json({ message: "Lesson not found" });

  } catch (error) {
    res.status(500).json({error});
  }
};

exports.getById = async function (req, res) {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing URL parameter: id' });
    }

    let result = await LessonModel.findById(req.params.id);

    if (result) {
      const subject = await SubjectModel.findById(result.subject);
      const group = await GroupModel.findById(result.group);
      const schedule = await ScheduleModel.findById(result.schedule);
      const teacher = await UserModel.findById(result.teacher);

      console.log(req.query.timezone);

      res.json({
        subject: {
          value: result.subject,
          label: subject.name
        },
        group: {
          value: result.group,
          label: group.groupName
        },
        schedule: {
          value: result.schedule,
          label: `${moment.weekdays(schedule.dayOfWeek)} (${moment(schedule.startTime).format('LT')} - ${moment(schedule.endTime).format('LT')}) - ${schedule.numberInSchedule}`
        },
        teacher: {
          value: result.teacher,
          label: teacher.fullName
        },
        weekOfMonth: {
          value: result.weekOfMonth
        }
      })

    } else res.status(404).json({ message: "Lesson not found" });

  } catch (error) {
    res.status(500).json({error});
  }
};

exports.delete = async function (req, res) {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing URL parameter: id' });
    }

    const result = await LessonModel.findByIdAndRemove(req.params.id);

    res.json(result);
  } catch (error) {
    res.status(500).json({error});
  }
};
