const mongoose = require('mongoose');

const server = "localhost:27017";
const database = "student-reminder";
const user = "";
const password = "";

mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`, { useNewUrlParser: true, useFindAndModify: false });

module.exports = mongoose;
