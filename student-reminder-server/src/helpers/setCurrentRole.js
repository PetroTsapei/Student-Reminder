const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  let decodeJwt = jwt.decode(req.token);

  if (decodeJwt) req.role = decodeJwt.user.role;
  next();
};
