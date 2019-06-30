const mongoose = require('./index');
const GroupModel = require('../models/group');
const SubjectModel = require('../models/subject');
const ScheduleModel = require('../models/schedule');
const UserModel = require('../models/user');
const ObjectId = mongoose.Schema.Types.ObjectId;

const LessonSchema = new mongoose.Schema({
  subject: {
    type: ObjectId,
    required: true
  },
  group: {
    type: ObjectId,
    required: true
  },
  teacher: {
    type: ObjectId,
    required: true
  },
  schedule: {
    type: ObjectId,
    required: true
  },
  numberOfWeek: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4]
  }
});

LessonSchema.pre('validate', function (next) {
  let self = this;

  GroupModel.findOne({ _id: self.group })
    .then(doc => {
      if (!doc && self.group) next({error: "Group not found"});
      else {
        SubjectModel.findOne({ _id: self.subject })
          .then(doc => {
            if (!doc && self.subject) next({error: "Subject not found"});
            else {
              ScheduleModel.findOne({ _id: self.schedule })
                .then(doc => {
                  if (!doc && self.schedule) next({error: "Schedule not found"});
                  else {
                    UserModel.findOne({ _id: self.teacher, role: "teacher" })
                      .then(doc => {
                        if (!doc && self.teacher) next({error: "Teacher not found"});
                        else {
                          self.constructor.findOne({ schedule: self.schedule, numberOfWeek: self.numberOfWeek })
                            .then(doc => {
                              if (doc) next({error: "Lesson already exist for this group"});
                              else next();
                            })
                            .catch(error => next({error}))
                        }
                      })
                      .catch(error => next({error}))
                  }
                })
                .catch(error => next({error}))
            }
          })
          .catch(error => next({error}))
      }
    })
    .catch(error => next({error}))
})

module.exports = mongoose.model('Lesson', LessonSchema);