const mongoose = require('mongoose');
require('dotenv').config();

const server = process.env.SERVER;
const database = process.env.DATABASE;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

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
