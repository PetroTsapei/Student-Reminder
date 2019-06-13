const CustomerModel = require('../models/customer.model');

exports.post = function (req, res) {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }

  // let user = {
  //   name: 'Tsapei Petro',
  //   email: 'petro.t@coaxsoft.com'
  // };

  let model = new CustomerModel(req.body);
  model.save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }

      res.status(201).send(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    })
};

exports.get = function (req, res) {
  if (!req.query.email) {
    return res.status(400).send('Missing URL parameter: email');
  }

  CustomerModel.findOne({
    email: req.query.email
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err);
    })
};

exports.put = function (req, res) {
  if (!req.query.email) {
    return res.status(400).send('Missing URL parameter: email');
  }

  CustomerModel.findOneAndUpdate({
    email: req.query.email
  }, req.body, {
    new: true
  })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err)
    })
};

exports.delete = function (req, res) {
  if (!req.query.email) {
    return res.status(400).send('Missing URL parameter: email');
  }

  CustomerModel.findOneAndRemove({
    email: req.query.email
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
};
