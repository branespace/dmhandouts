var Adventure = require(__dirname + '/../../models/adventure');
var handleError = require(__dirname + '/../../lib/error_handler');

exports.get = function(req, res) {
  var query = {unlocked: true};
  if (req.user.admin) {
    query = {};
  }
  Adventure.find(query, function(err, data) {
    if (err || !data) {
      return handleError.internalServer(err, res);
    }
    res.status(200).json(data);
  });
};

exports.getAdventure = function(req, res) {
  var query = {unlocked: true, _id: req.params.id};
  if (req.user.admin) {
    queru = {_id: req.params.id};
  }
  Adventure.find(query, function(err, data) {
    if (err) {
      return handleError.internalServer(err, res);
    }
    if (!data || data.length === 0) {
      return handleError.notFound(req.params.id +
          ' not found or locked', res);
    }
    res.status(200).json(data);
  });
};

exports.updateAdventure = function(req, res) {
  Adventure.findById(req.params.id, function(err, data) {
    if (err) {
      return handleError.internalServer(err, res);
    }
    if (!data || data.length === 0) {
      return handleError.notFound(req.params.id +
          ' not found or locked', res);
    }
    if (!req.user.admin) {
      return handleError.unauthorized('unauthorized', res);
    }
    if (req.body && req.body.title) { data.title = req.body.title; }
    if (req.body && req.body.hasOwnProperty('unlocked')) {
      data.title = req.body.unlocked;
    }
    data.save(function(err, daa) {
      if (err) { return handleError.internalServer(err, res); }
      res.status(200).json(data);
    });
  });
};
