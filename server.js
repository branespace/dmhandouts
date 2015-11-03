'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);

var io = require('socket.io').listen(server);
var socketServer = require(__dirname + '/sockets/base')(io);

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGO_URL ||
                    'mongodb://localhost/dmhandouts_dev');

//Enable CORS middleware
app.use(function(req, resp, next) {
  resp.header('Access-Control-Allow-Origin', '*');
  resp.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  resp.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  next();
});

var assetRouter = require(__dirname + '/routes/asset_routes');

app.use('/api', assetRouter);
app.use(express.static('build'));

var port = process.env.PORT || 3000;
var iface = '0.0.0.0';

server.listen(port, iface, function() {
  console.log('server running at: ' + iface);
  console.log('  port: ' + port);
});

module.exports = exports = server;

server.shutdown = function() {
  mongoose.disconnect();
  server.close();
};
