const express = require('express');
const app = express();
const userRoute = require('./routes/user');
const groupRoute = require('./routes/group');
const subjectRoute = require('./routes/subject');
const scheduleRoute = require('./routes/schedule');
const lessonRoute = require('./routes/lesson');
const settingRoute = require('./routes/setting');
const bodyParser = require('body-parser');
require('dotenv').config();

// cors policy
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
  next();
});

app.use(bodyParser.json());
app.use(groupRoute);
app.use(userRoute);
app.use(subjectRoute);
app.use(scheduleRoute);
app.use(lessonRoute);
app.use(settingRoute);
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
  next()
});

// Handler for 404
app.use((req, res, next) => {
  res.status(404).send("You are lost");
});

// Handler for 500
app.use((err, req, res) => {
  console.error(err.stack);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));
