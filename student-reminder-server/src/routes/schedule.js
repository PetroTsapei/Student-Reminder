const ScheduleController = require('../controllers/schedule');
const bodyValidator = require('../helpers/bodyValidator');
const tokenVerify = require('../helpers/tokenVerify');
const roleVerify = require('../helpers/roleVerify');
const express = require('express');
const router = express.Router();

adminVerify = (req, res, next) => roleVerify(req, res, next, 'admin');

router.post('/api/schedules', [tokenVerify, bodyValidator, adminVerify], ScheduleController.post);
router.put('/api/schedules/:id', [tokenVerify, bodyValidator, adminVerify], ScheduleController.put);
router.get('/api/schedules', [tokenVerify, roleVerify], ScheduleController.getAll);
router.delete('/api/schedules/:id', [tokenVerify, adminVerify], ScheduleController.delete);

module.exports = router;