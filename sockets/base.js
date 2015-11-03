var EventEmitter = require('events');

var instance;

module.exports = exports = function(io, newInstance) {
  if (!instance || newInstance) {
    instance = new SocketServer(io);
  }
  return instance;
};

function SocketServer(io) {
  io.on('connection', function(socket) {
    socket.on('ping', function() {
      io.sockets.emit('pong');
    });
  });

  this.update = function(context) {
    io.sockets.emit('update', context);
  };
}
