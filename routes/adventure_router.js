'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var adventureRouter = module.exports = exports = express.Router();
var eatAuth = require(__dirname + '/../lib/eat_auth');

var adventureRoutes = require(__dirname + '/adventure/adventure_routes');

adventureRouter.get('/adventure', eatAuth, adventureRoutes.get);

adventureRouter.get('/adventure/:id', eatAuth,
    adventureRoutes.getAdventure);

adventureRouter.patch('/adventure/:id', jsonParser, eatAuth,
    adventureRoutes.updateAdventure);
