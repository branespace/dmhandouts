'use strict';

var chai = require('chai');
var expect = chai.expect;

var server = require(__dirname + '/../../server.js');

describe('server tests', function() {

  require(__dirname + '/socket_tests');

  after(function(done) {
    server.shutdown();
    done();
  });
});
