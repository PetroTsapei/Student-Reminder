const mongoose = require('./index');

const UserSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  groupName: {
    type: String,
    required: function() { return this.isTeacher === false; }
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  isTeacher: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
