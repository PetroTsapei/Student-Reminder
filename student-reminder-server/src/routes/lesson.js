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
const compareObj = require('../helpers/compareObj');
const jwt = require('jsonwebtoken');
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
                          LessonModel.findOne({ schedule: self.schedule, weekOfMonth: self.weekOfMonth, group: self.group }, '-__v')
                            .then(doc => {
                              if (doc) {
                                const {
                                  _id,
                                  ...rest
                                } = doc._doc;

                                if (
                                  req.params.id == _id && ((compareObj(self, rest)) ||
                                  (self.teacher !== doc.teacher) || (self.subject !== doc.subject))
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

checkIfExistUser = async (req, res, next) => {
  const {
    user: {
      _id
    }
  } = jwt.decode(req.token);

  const user = await UserModel.findById(_id);

  if (!user) return res.status(401).json({ error: "User not found" });

  next();
};

router.post('/api/lessons', [tokenVerify, bodyValidator, adminVerify, tokenValidate, lessonValidate], LessonController.post);
router.get('/api/lessons', [tokenVerify, groupVerify, setCurrentRole, tokenValidate, checkIfExistUser], LessonController.getAllByGroup);
router.get('/api/lessons/all', [tokenVerify, adminVerify, tokenValidate], LessonController.getAll);
router.get('/api/lessons/:id', [tokenVerify, setCurrentRole, tokenValidate], LessonController.getById);
router.put('/api/lessons/:id', [tokenVerify, adminVerify, tokenValidate, lessonValidate], LessonController.put);
router.delete('/api/lessons/:id', [tokenVerify, adminVerify, tokenValidate], LessonController.delete);

module.exports = router;
