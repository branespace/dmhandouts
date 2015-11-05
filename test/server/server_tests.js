'use strict';

var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');

process.env.MONGO_URL = 'mongodb://localhost/dmhandouts_test';
process.env.LOG_DIR = __dirname + '/logs';

var server = require(__dirname + '/../../server.js');

describe('server tests', function() {

  require(__dirname + '/socket_tests');
  require(__dirname + '/asset_routes_tests');
  require(__dirname + '/action_routes_tests');
  require(__dirname + '/user_tests');
  require(__dirname + '/adventure_tests');

  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) { return console.log(err); }
      server.shutdown();
      mongoose.connection.close();
      done();
    });
  });
});
