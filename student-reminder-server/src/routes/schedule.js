const ScheduleController = require('../controllers/schedule');
const ScheduleModel = require('../models/schedule');
const bodyValidator = require('../helpers/bodyValidator');
const tokenVerify = require('../helpers/tokenVerify');
const roleVerify = require('../helpers/roleVerify');
const setCurrentRole = require('../helpers/setCurrentRole');
const setSetting = require('../helpers/setSetting');
const tokenValidate = require('../helpers/tokenValidate');
const express = require('express');
const router = express.Router();

adminVerify = (req, res, next) => roleVerify(req, res, next, 'admin');

function validateUpdate(req, res, next) {
  const {
    typeOfTime,
    numberInSchedule,
    dayOfWeek
  } = req.body;

  ScheduleModel.find({ _id: { $ne: req.params.id }, typeOfTime, numberInSchedule, dayOfWeek })
    .then(doc => {
      if (doc.length) res.status(400).json({ error: "Schedule already exist" });
      else next();
    })
    .catch(error => res.status(500).json(error));
}

router.post('/api/schedules', [tokenVerify, bodyValidator, adminVerify, tokenValidate, setSetting], ScheduleController.post);
router.put('/api/schedules/:id', [validateUpdate, tokenVerify, bodyValidator, adminVerify, tokenValidate, setSetting], ScheduleController.put);
router.get('/api/schedules', [tokenVerify, setCurrentRole, tokenValidate, setSetting], ScheduleController.getAll);
router.get('/api/schedules/:scheduleId', [tokenVerify, setCurrentRole, tokenValidate], ScheduleController.get);
router.delete('/api/schedules/:id', [tokenVerify, adminVerify, tokenValidate], ScheduleController.delete);

module.exports = router;