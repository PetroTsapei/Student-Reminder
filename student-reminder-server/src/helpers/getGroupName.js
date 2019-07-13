const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  let decodeJwt = jwt.decode(req.token);
  
  if (decodeJwt) req.group = decodeJwt.user.groupName;
  next();
};
