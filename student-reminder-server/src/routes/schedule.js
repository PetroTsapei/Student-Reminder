const ScheduleController = require('../controllers/schedule');
const ScheduleModel = require('../models/schedule');
const bodyValidator = require('../helpers/bodyValidator');
const tokenVerify = require('../helpers/tokenVerify');
const roleVerify = require('../helpers/roleVerify');
const setCurrentRole = require('../helpers/setCurrentRole');
const tokenValidate = require('../helpers/tokenValidate');
const express = require('express');
const router = express.Router();

adminVerify = (req, res, next) => roleVerify(req, res, next, 'admin');

function validateUpdate(req, res, next) {
  const {
    typeOfTime,
    numberInSchedule
  } = req.body;

  if (numberInSchedule && !typeOfTime) {
    ScheduleModel.findById(req.params.id)
      .then(doc => {
        if (doc.numberInSchedule == numberInSchedule) next();
        else {
          ScheduleModel.find({ _id: { $ne: doc._id }, numberInSchedule, typeOfTime: doc.typeOfTime })
            .then(doc => {
              if (doc.length) res.status(400).json({ error: "Schedule already exist" });
              else next();
            })
            .catch(error => res.status(500).json(error));
        }
      })
      .catch(error => res.status(500).json(error))
  } else if (typeOfTime && !numberInSchedule) {
    ScheduleModel.findById(req.params.id)
      .then(doc => {
        if (doc.typeOfTime == typeOfTime) next();
        else {
          ScheduleModel.find({ _id: { $ne: doc._id }, typeOfTime, numberInSchedule: doc.numberInSchedule })
            .then(doc => {
              if (doc.length) res.status(400).json({ error: "Schedule already exist" });
              else next();
            })
        }
      })
      .catch(error => res.status(500).json(error))
  } else if (typeOfTime && numberInSchedule) {
    ScheduleModel.find({ _id: { $ne: req.params.id }, typeOfTime, numberInSchedule })
      .then(doc => {
        if (doc.length) res.status(400).json({ error: "Schedule already exist" });
        else next();
      })
      .catch(error => res.status(500).json(error));

  } else next();
}

router.post('/api/schedules', [tokenVerify, bodyValidator, adminVerify], ScheduleController.post);
router.put('/api/schedules/:id', [validateUpdate, tokenVerify, bodyValidator, adminVerify], ScheduleController.put);
router.get('/api/schedules', [tokenVerify, setCurrentRole], ScheduleController.getAll);
router.get('/api/schedules/:scheduleId', [tokenVerify, setCurrentRole, tokenValidate], ScheduleController.get);
router.delete('/api/schedules/:id', [tokenVerify, adminVerify], ScheduleController.delete);

module.exports = router;