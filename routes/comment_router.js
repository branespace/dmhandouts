'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var commentRouter = module.exports = exports = express.Router();
var eatAuth = require(__dirname + '/../lib/eat_auth');

var commentRoutes = require(__dirname + '/comment/comment_routes');

commentRouter.get('/comment/:id', eatAuth, commentRoutes.get);
commentRouter.post('/comment', jsonParser, eatAuth, commentRoutes.create);
commentRouter.delete('/comment/:id', eatAuth, commentRoutes.remove);
