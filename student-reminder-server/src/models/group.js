const mongoose = require('./index');
const ObjectId = mongoose.Schema.Types.ObjectId;

const GroupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  dateOfCreation: {
    type: Date,
    required: true,
    // max: function() { return this.releaseDate }
  },
  releaseDate: {
    type: Date,
    required: true,
    // min: function() { return this.dateOfCreation }
  },
  groupCurator: ObjectId,
  groupLeader: ObjectId
});

module.exports = mongoose.model('Group', GroupSchema);
