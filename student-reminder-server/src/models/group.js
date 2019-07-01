const mongoose = require('./index');
const UserModel = require('./user');
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
    max: function() { return this.releaseDate }
  },
  releaseDate: {
    type: Date,
    required: true,
    min: function() { return this.dateOfCreation }
  },
  groupCurator: {
    type: ObjectId,
    required: true
  },
  groupLeader: {
    type: ObjectId,
    required: true
  }
});

GroupSchema.pre('validate', function (next) {
  let self = this;
  // TODO fix circlic
console.log(UserModel);
  UserModel.findOne({ _id: self.groupCurator, role: "teacher" })
    .then(doc => {
      console.log(doc);
    })
    .catch(error => console.log(error))
})

module.exports = mongoose.model('Group', GroupSchema);
