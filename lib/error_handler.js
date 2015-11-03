'use strict';

var log = require(__dirname + '/logger');

exports.badRequest = function(msg, res) {
  if (msg) { log(msg); }
  sendError(400, res);
};

exports.unauthorized = function(msg, res) {
  if (msg) { log(msg); }
  sendError(401, res);
};

exports.forbidden = function(msg, res) {
  if (msg) { log(msg); }
  sendError(403, res);
};

exports.notFound = function(msg, res) {
  if (msg) { log(msg); }
  sendError(404, res);
};

exports.internalServer = function(msg, res) {
  if (msg) { log(msg); }
  sendError(500, res);
};

function sendError(status, res) {
  res.sendStatus(status);
}
