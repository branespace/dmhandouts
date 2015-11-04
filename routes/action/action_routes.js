var Action = require(__dirname + '/../../models/action');
var handleError = require(__dirname + '/../../lib/error_handler');

exports.get = function(req, res) {
  Action.find({originAsset: req.params.id}, function(err, data) {
    if (err || !data) {
      return handleError.internalServer(err, res);
    }
    res.status(200).json(data);
  });
};

exports.getaction = function(req, res) {
  Action.findOne({_id: req.params.id}, function(err, data) {
    if (err) {
      return handleError.internalServer(err, res);
    }
    if (!data || data.length === 0) {
      return handleError.notFound(req.params.id +
          ' not found', res);
    }
    res.status(200).json(data);
  });
};

exports.update = function(req, res) {
  Action.findById(req.params.id, function(err, data) {
    if (err) { return handleError.internalServer(err, res); }
    data.name = req.body.name || data.name;
    data.originAsset = req.body.originAsset || data.originAsset;
    data.targetAsset = req.body.targetAsset || data.targetAsset;
    if (req.body.hasOwnProperty('activated')) {
      data.activated = req.body.activated;
    }
    data.save(function(err, data) {
      if (err) { return handleError.internalServer(err, res); }
      res.status(200).json(data);
    });
  });
};

exports.remove = function(req, res) {
  Action.findByIdAndRemove(req.params.id, function(err, data) {
    if (err) { return handleError.internalServer(err, res); }
    res.sendStatus(200);
  });
};

exports.create = function(req, res) {
  var newAction = new Action(req.body);
  newAction.save(function(err, data) {
    if (err) { return handleError.internalServer(err, res); }
    res.status(200).json(data);
  });
};
