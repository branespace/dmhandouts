'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var mongoose = require('mongoose');
var serverURI = 'localhost:3000/api';
var Action = require(__dirname + '/../../models/action');
var User = require(__dirname + '/../../models/user');

var actions = [];

describe('action routes', function() {
  var token;

  before(function(done) {
    var newUser = new User({
      username: 'actiontestuser',
      basic: {
        username: 'actiontestuser'
      },
      admin: true
    });
    newUser.generateHash('pwd', function(err, hash) {
      newUser.save(function(err, data) {
        newUser.generateToken(function(err, newToken) {
          token = newToken;
          done();
        });
      });
    });
  });

  it('should create a new action', function(done) {
    chai.request(serverURI)
      .post('/actions')
      .set('token', token)
      .send({
        targetAsset: '1',
        originAsset: '2',
        name: 'trigger',
        activated: false
      })
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.name).to.eql('trigger');
        actions.push(res.body);
        done();
      });
  });
  it('should return an action by id', function(done) {
    chai.request(serverURI)
      .get('/actions/' + actions[0]._id)
      .set('token', token)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.name).to.eql('trigger');
        done();
      });
  });
  it('should allow updates', function(done) {
    chai.request(serverURI)
      .patch('/actions/' + actions[0]._id)
      .set('token', token)
      .send({activated: true})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.activated).to.eql(true);
        done();
      });
  });
  it('should get actions by asset', function(done) {
    chai.request(serverURI)
      .get('/assetActions/' + 2)
      .set('token', token)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body[0].name).to.eql('trigger');
        done();
      });
  });
  it('should delete assets', function(done) {
    chai.request(serverURI)
      .delete('/actions/' + actions[0]._id)
      .set('token', token)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        Action.find({}, function(err, data) {
          expect(data.length).to.eql(0);
          done();
        });
      });
  });
});
