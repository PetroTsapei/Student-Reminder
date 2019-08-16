const mongoose = require('./index');

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  }
});

module.exports = mongoose.model('Subject', SubjectSchema);