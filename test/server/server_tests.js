'use strict';

var chai = require('chai');
var expect = chai.expect;

var server = require(__dirname + '/../../server.js');

var mongoose = require('mongoose');

process.env.MONGO_URL = 'mongodb://localhost/dmhandouts_test';

describe('server tests', function() {

  require(__dirname + '/socket_tests');
  require(__dirname + '/asset_routes_tests');

  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) { return console.log(err); }
      server.shutdown();
      mongoose.connection.close();
      done();
    });
  });
});
