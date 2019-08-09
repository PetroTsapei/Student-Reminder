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
  groupCurator: ObjectId,
  groupLeader: ObjectId
});

GroupSchema.pre('validate', function (next) {
  let self = this;

  UserModel.findOneAndUpdate({ _id: self.groupCurator, role: "teacher" }, { groupCurator: true })
    .then(doc => {
      if (!doc && self.groupCurator) next({error: "Courator not found"});
      else {
        UserModel.findOneAndUpdate({ _id: self.groupLeader, role: "student" }, { groupLeader: true })
          .then(doc => {
            if (!doc && self.groupLeader) next({error: "Group leader not found"});
            else next();
          })
          .catch(error => next({error}))
      }
    })
    .catch(error => next({error}))
})

module.exports = mongoose.model('Group', GroupSchema);
