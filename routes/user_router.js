var express = require('express');
var jsonParser = require('body-parser').json();
var eatAuth = require(__dirname + '/../lib/eat_auth');
var httpBasic = require(__dirname + '/../lib/http_basic');
var userRoutes = require(__dirname + '/user/user_routes');

var userRouter = module.exports = exports = express.Router();

userRouter.post('/signup', jsonParser, userRoutes.signup);
userRouter.get('/signin', httpBasic, userRoutes.signin);
userRouter.patch('/user', jsonParser, eatAuth, userRoutes.changePassword);
