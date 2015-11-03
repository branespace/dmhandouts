'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);

//Enable CORS middleware
app.use(function(req, resp, next) {
  resp.header('Access-Control-Allow-Origin', '*');
  resp.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  resp.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  next();
});

app.use(express.static('build'));

var port = process.env.PORT || 3000;
var iface = '0.0.0.0';

server.listen(port, iface, function() {
  console.log('server running at: ' + iface);
  console.log('  port: ' + port);
});

module.exports = exports = server;

server.shutdown = function() {
  server.close();
};
