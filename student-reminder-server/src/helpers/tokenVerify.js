// Authorization: Bearer <access_token>

module.exports = function tokenVerify(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(' ');
    // Get token from array
    req.token = bearer[1];
    // next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};
