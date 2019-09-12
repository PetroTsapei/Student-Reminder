const mongoose = require('./index');
const ObjectId = mongoose.Schema.Types.ObjectId;

const SettingSchema = new mongoose.Schema({
  institution: {
    type: ObjectId,
    required: true,
    unique: true
  },
  typeOfTime: {
    type: String,
    enum: ["full", "short"],
    default: "full"
  }
});

module.exports = mongoose.model('Setting', SettingSchema);