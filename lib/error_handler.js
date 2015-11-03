'use strict';

var log = require(__dirname + '/logger');

exports.badRequest = function(msg, resp) {
  if (msg) { log(msg); }
  sendError(400, 'Bad Request', resp);
};

exports.unauthorized = function(msg, resp) {
  if (msg) { log(msg); }
  sendError(401, 'Unauthorized', resp);
};

exports.forbidden = function(msg, resp) {
  if (msg) { log(msg); }
  sendError(403, 'Forbidden', resp);
};

exports.notFound = function(msg, resp) {
  if (msg) { log(msg); }
  sendError(404, 'Document Not Found', resp);
};

exports.internalServer = function(msg, resp) {
  if (msg) { log(msg); }
  sendError(500, 'Internal Server Error', resp);
};

function sendError(status, msg, resp) {
  resp.status(status).json(msg);
}
