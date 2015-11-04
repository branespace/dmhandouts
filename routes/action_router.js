'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var actionRouter = module.exports = exports = express.Router();
var eatAuth = require(__dirname + '/../lib/eat_auth');
var adminRoute = require(__dirname + '/../lib/admin_route');

var actionRoutes = require(__dirname + '/action/action_routes');

actionRouter.get('/assetActions/:id', eatAuth, adminRoute, actionRoutes.get);
actionRouter.get('/actions/:id', eatAuth, adminRoute, actionRoutes.getaction);
actionRouter.post('/actions', jsonParser, eatAuth,
    adminRoute, actionRoutes.create);
actionRouter.delete('/actions/:id', eatAuth, adminRoute, actionRoutes.remove);
actionRouter.patch('/actions/:id', jsonParser, eatAuth,
    adminRoute, actionRoutes.update);
