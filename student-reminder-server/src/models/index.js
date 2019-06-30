const mongoose = require('mongoose');

const server = "localhost:27017";
const database = "student-reminder";
const user = "";
const password = "";

mongoose.plugin(schema => {
  schema.pre('findOneAndUpdate', setRunValidators);
  schema.pre('updateMany', setRunValidators);
  schema.pre('updateOne', setRunValidators);
  schema.pre('update', setRunValidators);
});

function setRunValidators () {
  this.setOptions({ runValidators: true });
}

mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`, { useNewUrlParser: true, useFindAndModify: false });

module.exports = mongoose;
