const mongoose = require('./index');
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
  weekOfMonth: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4]
  }
});

module.exports = mongoose.model('Lesson', LessonSchema);