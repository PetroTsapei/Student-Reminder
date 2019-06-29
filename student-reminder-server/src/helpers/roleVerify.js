const jwt = require('jsonwebtoken');

module.exports = function (req, res, next, role) {
  let decodeJwt = jwt.decode(req.token);

  if (decodeJwt) decodeJwt.user.role === role ? req.role = role : req.role = decodeJwt.user.role;
  next();
};
