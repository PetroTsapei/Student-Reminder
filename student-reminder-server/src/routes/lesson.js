const LessonController = require('../controllers/lesson');
const GroupModel = require('../models/group');
const SubjectModel = require('../models/subject');
const ScheduleModel = require('../models/schedule');
const UserModel = require('../models/user');
const LessonModel = require('../models/lesson');
const tokenVerify = require('../helpers/tokenVerify');
const tokenValidate = require('../helpers/tokenValidate');
const bodyValidator = require('../helpers/bodyValidator');
const roleVerify = require('../helpers/roleVerify');
const groupVerify = require('../helpers/getGroupName');
const setCurrentRole = require('../helpers/setCurrentRole');
const express = require('express');
const router = express.Router();

adminVerify = (req, res, next) => roleVerify(req, res, next, 'admin');

lessonValidate = (req, res, next) => {
  let self = req.body;

  GroupModel.findById(self.group)
    .then(doc => {
      if (!doc && self.group) res.status(404).json({error: "Group not found"});
      else {
        SubjectModel.findById(self.subject)
          .then(doc => {
            if (!doc && self.subject) res.status(404).json({error: "Subject not found"});
            else {
              ScheduleModel.findById(self.schedule)
                .then(doc => {
                  if (!doc && self.schedule) res.status(404).json({error: "Schedule not found"});
                  else {
                    UserModel.findOne({ _id: self.teacher, role: "teacher" })
                      .then(doc => {
                        if (!doc && self.teacher) res.status(404).json({error: "Teacher not found"});
                        else {
                          LessonModel.findOne({ schedule: self.schedule, weekOfMonth: self.weekOfMonth, group: self.group }, '-_id -__v')
                            .then(doc => {
                              // TODO fix this validate
                              if (doc) {
                                if (
                                  JSON.stringify({
                                    subject: self.subject,
                                    group: self.group,
                                    schedule: self.schedule,
                                    teacher: self.teacher,
                                    weekOfMonth: self.weekOfMonth
                                  }) === JSON.stringify({
                                    subject: doc.subject,
                                    group: doc.group,
                                    schedule: doc.schedule,
                                    teacher: doc.teacher,
                                    weekOfMonth: doc.weekOfMonth
                                  })
                                ) return next();

                                res.status(400).json({error: "Lesson already exist for this group"});
                              }
                              else next();
                            })
                            .catch(error => res.status(500).json(error))
                        }
                      })
                      .catch(error => res.status(500).json(error))
                  }
                })
                .catch(error => res.status(500).json(error))
            }
          })
          .catch(error => res.status(500).json(error))
      }
    })
    .catch(error => res.status(500).json(error))
};

router.post('/api/lessons', [tokenVerify, bodyValidator, adminVerify, tokenValidate, lessonValidate], LessonController.post);
router.get('/api/lessons', [tokenVerify, groupVerify, setCurrentRole, tokenValidate], LessonController.getAllByGroup);
router.get('/api/lessons/all', [tokenVerify, adminVerify, tokenValidate], LessonController.getAll);
router.get('/api/lessons/:id', [tokenVerify, setCurrentRole, tokenValidate], LessonController.getById);
router.put('/api/lessons/:id', [tokenVerify, adminVerify, tokenValidate, lessonValidate], LessonController.put);
router.delete('/api/lessons/:id', [tokenVerify, adminVerify, tokenValidate], LessonController.delete);

module.exports = router;