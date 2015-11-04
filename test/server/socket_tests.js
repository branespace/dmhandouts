'use strict';

var chai = require('chai');
var expect = chai.expect;

var io = require('socket.io-client');
var socketURL = 'http://localhost:3000';
var socketOptions = {
  transports: ['websocket'],
  'force new connection': true
};
var socket;

describe('socket connection', function() {
  before(function(done) {
    socket = io.connect(socketURL, socketOptions);
    socket.on('connect', function() {
      done();
    });
  });

  it('should accept connections', function() {
    expect(socket.connected).to.eql(true);
  });

  it('should respond to connection test', function(done) {
    socket.on('pong', function() {
      done();
    });
    socket.emit('ping');
  });

  after(function(done) {
    if (socket.connected) {
      socket.disconnect();
    }
    done();
  });
});
