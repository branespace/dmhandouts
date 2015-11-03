var handleError = require(__dirname + '/error_handler');

module.exports = exports = function(req, res, next) {
  if (!req.user.admin) {
    return handleError.unauthorized('not an admin', res);
  }
  next();
};
