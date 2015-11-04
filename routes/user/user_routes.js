var handleError = require(__dirname + '/../../lib/error_handler');
var User = require(__dirname + '/../../models/user');
var mongoose = require('mongoose');

exports.signup = function(req, res) {
  if (!req.body || !req.body.signupCode || !req.body.username ||
      !req.body.password) {
    return handleError.badRequest('missing signup fields', res);
  }
  if (req.body.signupCode !== process.env.SIGNUP_CODE) {
    return handleError.unauthorized('wrong code for signup', res);
  }
  var newUser = new User({
    username: req.body.username,
    basic: {
      username: req.body.username
    }
  });
  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) { return handleError.internalServer(err, res); }
    newUser.save(function(err, data) {
      if (err) { return handleError.internalServer(err, res); }
      newUser.generateToken(function(err, token) {
        res.status(200).json({token: token});
      });
    });
  });
};

exports.signin = function(req, res) {
  User.findOne({'basic.username': req.auth.username}, function(err, user) {
    if (err) { return handleError.internalServer(err, res); }
    if (!user) { return handleError.unauthorized('unauthorized', res); }
    user.compareHash(req.auth.password, function(err, hashRes) {
      if (err) { return handleError.internalServer(err, res); }
      if (!hashRes) { return handleError.unauthorized('unauthorized', res); }
      user.generateToken(function(err, token) {
        if (err) { return handleError.internalServer(err, res); }
        res.status(200).json({token: token});
      });
    });
  });
};

exports.changePassword = function(req, res) {
  if (!req.body || !req.body.password) {
    return handleError.badRequest('missing body or new password', res);
  }
  var user = req.user;
  user.generateHash(req.body.password, function(err, hash) {
    if (err) { return handleError.internalServer(err, res); }
    user.save(function(err, data) {
      if (err) { return handleError.internalServer(err, res); }
      res.status(200).json({token: req.headers.token});
    });
  });
};

exports.getUserName = function(req, res) {
  res.status(200).json({username: req.user.username});
};
