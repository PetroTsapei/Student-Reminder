module.exports = function (req, res, next) {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({error: 'Request body is missing'});
  }
  next();
};
