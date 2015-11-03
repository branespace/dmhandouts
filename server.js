'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var socketServer = require(__dirname + '/sockets/base')(io);
var mongoose = require('mongoose');
var log = require(__dirname + '/lib/logger');

mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGO_URL ||
                    'mongodb://localhost/dmhandouts_dev');
process.env.APP_SECRET = process.env.APP_SECRET || 'PANTHERCORN';
process.env.SIGNUP_CODE = process.env.SIGNUP_CODE || 'test';
process.env.LOG_DIR = process.env.LOG_DIR || __dirname + '/logs';

//Enable CORS middleware
app.use(function(req, resp, next) {
  resp.header('Access-Control-Allow-Origin', '*');
  resp.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  resp.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  next();
});

var assetRouter = require(__dirname + '/routes/asset_router');
var userRouter = require(__dirname + '/routes/user_router');

app.use('/api', assetRouter);
app.use('/api', userRouter);
app.use(express.static('build'));

var port = process.env.PORT || 3000;
var iface = '0.0.0.0';

server.listen(port, iface, function() {
  log('server running at: ' + iface);
  log('             port: ' + port);
});

module.exports = exports = server;

server.shutdown = function() {
  mongoose.disconnect();
  server.close();
};
