var eat = require('eat');
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/error_handler');

module.exports = exports = function(req, res, next) {
  var encryptedToken = req.headers.token ||
      (req.headers.cookie ? decodeURIComponent(req.headers.cookie.slice(6))
      : '') || (req.body ? req.body.token : undefined);
  if (!encryptedToken) {
    return handleError.unauthorized('no token received', res);
  }
  eat.decode(encryptedToken, process.env.APP_SECRET, function(err, token) {
    if (err) { return handleError.internalServer(err, res); }
    User.findOne({_id: token.id}, function(err, user) {
      if (err) { return handleError.internalServer(err, res); }
      if (!user) { return handleError.unauthorized(token + ' not found', res);}
      req.user = user;
      next();
    });
  });
};
