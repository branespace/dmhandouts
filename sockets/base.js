var EventEmitter = require('events');
var eat = require(__dirname + '/../lib/eat_auth');
var User = require(__dirname + '/../models/user');

var instance;

module.exports = exports = function(io, newInstance) {
  if (!instance || newInstance) {
    instance = new SocketServer(io);
  }
  return instance;
};

function SocketServer(io) {
  this.ee = new EventEmitter();
  io.on('connection', function(socket) {
    socket.on('ping', function() {
      io.sockets.emit('pong');
    });
    socket.on('registerProjector', function() {
      socket.join('projector');
      ee.emit('projectorJoined');
    });
    socket.on('registerAdmin', function(token) {
      var user = getUser(token);
      if (user && user.admin) {
        socket.join('admin');
        ee.emit('adminJoined');
      }
    });
    socket.on('registerUser', function(token) {
      var user = getUser(token);
      if (user) {
        socket.join('party');
        ee.emit('partyJoined', user);
      }
    });
  });

  this.update = function(context) {
    io.sockets.emit('update', context);
  };

}

function getUser(token) {
  eat.decode(token, process.env.APP_SECRET, function(err, token) {
    User.findOne({_id: token.id}, function(err, user) {
      if (user) { return user; }
    });
  });
}
