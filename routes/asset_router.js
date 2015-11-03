'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var assetRouter = module.exports = exports = express.Router();
var eatAuth = require(__dirname + '/../lib/eat_auth');

var assetRoutes = require(__dirname + '/asset/asset_routes');

assetRouter.get('/assets', eatAuth, assetRoutes.get);

assetRouter.get('/assets/:id', eatAuth, assetRoutes.getAsset);

assetRouter.patch('/assets/:id', jsonParser, eatAuth, assetRoutes.addComment);
