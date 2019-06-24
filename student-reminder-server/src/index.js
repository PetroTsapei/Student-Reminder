const express = require('express');
const app = express();
const personRoute = require('./routes/person');
const customerRoute = require('./routes/customer');
const userRoute = require('./routes/user');
const groupRoute = require('./routes/group');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.json());
app.use(personRoute);
app.use(customerRoute);
app.use(groupRoute);
app.use(userRoute);
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
