var Comment = require(__dirname + '/../../models/comment');
var handleError = require(__dirname + '/../../lib/error_handler');

exports.get = function(req, res) {
  Comment.find({asset: req.params.id},
        function(err, data) {
    if (err || !data) {
      return handleError.internalServer(err, res);
    }
    res.status(200).json(data);
  });
};

exports.create = function(req, res) {
  var newComment = new Comment(req.body);
  newComment.save(function(err, res) {
    if (err) { return handleError.internalServer(err, res); }    
    res.status(200).json(data);
  });
};

exports.remove = function(req, res) {
  Comment.findById(req.params.id, function(err, data) {
    if (err) { return handleError.internalServer(err, res); }
    if (data.user !== req.user.username) {
      return handleError.unauthorized('wrong user', res);
    }
    Comment.remove(data, function(err, res) {
      if (err) { return handleError.internalServer(err, res); }
      res.sendStatus(200);
    });
  });
};
