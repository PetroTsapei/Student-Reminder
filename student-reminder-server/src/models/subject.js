const mongoose = require('./index');

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Subject', SubjectSchema);