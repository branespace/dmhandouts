'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var Asset = require(__dirname + '/../models/asset');
var handleError = require(__dirname + '/../lib/error_handler');

var assetRouter = module.exports = exports = express.Router();

assetRouter.get('/assets', function(req, res) {
  Asset.find({unlocked: true}, function(err, data) {
    if (err || !data) {
      return handleError.internalServer(err, res);
    }
    res.status(200).json(data);
  });
});

assetRouter.get('/assets/:id', function(req, res) {
  Asset.findOne({unlocked: true, _id: req.params.id}, function(err, data) {
    if (err) {
      return handleError.internalServer(err, res);
    }
    if (!data || data.length === 0) {
      return handleError.notFound(req.params.id +
          ' not found or locked', res);
    }
    res.status(200).json(data);
  });
});

assetRouter.patch('/assets/:id', jsonParser, function(req, res) {
  Asset.findById(req.params.id, function(err, data) {
    if (err) { return handleError.internalServer(err, res); }
    data.comments.push(req.body.comment);
    data.save(function(err, data) {
      if (err) { return handleError.internalServer(err, res); }
      res.status(200).json(data);
    });
  });
});
