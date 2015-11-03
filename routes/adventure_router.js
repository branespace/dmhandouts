'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var adventureRouter = module.exports = exports = express.Router();
var eatAuth = require(__dirname + '/../lib/eat_auth');

var adventureRoutes = require(__dirname + '/adventure/adventure_routes');

adventureRouter.get('/adventures', eatAuth, adventureRoutes.get);

adventureRouter.get('/adventures/:id', eatAuth,
    adventureRoutes.getAdventure);

adventureRouter.patch('/adventures/:id', jsonParser, eatAuth,
    adventureRoutes.updateAdventure);
