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

ScheduleSchema.pre('validate', function (next) {
  this.constructor.findOne({ typeOfTime: this.typeOfTime, numberInSchedule: this.numberInSchedule })
    .then(doc => {
      if (doc) next({error: "Schedule already exist"});
      else next();
    })
    .catch(error => next({error}))
})

module.exports = mongoose.model('Schedule', ScheduleSchema);