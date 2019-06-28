const mongoose = require('./index');

const ScheduleSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  typeOfTime: {
    type: String,
    required: true,
    enum: ["full", "short"]
  },
  numberInSchedule: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);