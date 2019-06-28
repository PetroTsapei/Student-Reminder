const mongoose = require('./index');

const GroupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
    unique: true
  },
  dateOfCreation: {
    type: Date,
    required: true,
    max: function() { return this.releaseDate }
  },
  releaseDate: {
    type: Date,
    required: true,
    min: function() { return this.dateOfCreation }
  },
  groupCurator: {
    type: String,
    required: true
  },
  groupLeader: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Group', GroupSchema);
