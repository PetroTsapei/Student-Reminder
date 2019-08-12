const jwt = require('jsonwebtoken');

module.exports = function tokenValidate(req, res, next) {
  jwt.verify(req.token, req.role, err => {
    if (err) {
      res.status(403).json({ error: "Don't have access to this data" });
    } else next();
  })
}