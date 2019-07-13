const LessonModel = require('../models/lesson');
const jwt = require('jsonwebtoken');

exports.post = function(req, res) {
  jwt.verify(req.token, req.role, err => {
    if (err) {
      res.sendStatus(403);
    } else {
      
      let model = new LessonModel(req.body);

      model.save()
        .then(doc => {
          if (!doc || doc.length === 0) {
            return res.status(500).send(doc);
          }

          res.status(201).json({
            message: "Lesson created",
            lesson_info: doc
          });
        })
        .catch(err => {
          res.status(500).json(err);
        })
    }
  })
}

exports.getAll = function(req, res) {
  decodeJWT = jwt.decode(req.token);
  if (decodeJWT) req.role = decodeJWT.user.role;

  jwt.verify(req.token, req.role, err => {
    if (err) {
      res.sendStatus(403);
    } else {
      // console.log(req.query.typeOfTime);
      LessonModel.findOne({
        
      })
    }
  })
}