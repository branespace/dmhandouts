'use strict';

var chai = require('chai');
var expect = chai.expect;
var chaihttp = require('chai-http');
chai.use(chaihttp);
var sinon = require('sinon');
var User = require(__dirname + '/../../models/user');
var mongoose = require('mongoose');
var serverURI = 'localhost:3000/api';

describe('user routes', function() {
  var token;

  it('should accept new users', function(done) {
    chai.request(serverURI)
    .post('/signup')
    .send({username: 'DM', password: 'test', signupCode: 'test'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.token).to.not.eql(null);
      token = res.body.token;
      done();
    });
  });
  it('should allow signin', function(done) {
    chai.request(serverURI)
    .get('/signin')
    .auth('DM', 'test')
    .end(function(err, res) {
      token = res.body.token;
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });
  it('should allow password changing', function(done) {
    chai.request(serverURI)
    .patch('/user')
    .set('token', token)
    .send({password: 'test2'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      chai.request(serverURI)
      .get('/signin')
      .auth('DM', 'test2')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.token).to.not.eql(null);
        done();
      });
    });
  });
  describe('errors', function() {
    var userRoutes = require(__dirname + '/../../routes/user/user_routes');
    it('should decline incomplete signup requests', function() {
      var req;
      var res;
      var spy;
      req = res = {};
      req.body = {
        signupCode: 'test',
        username: 'testuser'
      };
      spy = res.sendStatus = sinon.spy();
      userRoutes.signup(req, res);
      expect(spy.calledWith(400)).to.eql(true);
      spy.reset();
    });
    it('should decline wrong signup codes', function() {
      var req = {};
      var res = {};
      var spy;
      req.body = {
        signupCode: 'test2',
        username: 'testuser',
        password: 'testpass'
      };
      spy = res.sendStatus = sinon.spy();
      userRoutes.signup(req, res);
      expect(spy.calledWith(401)).to.eql(true);
      res = {};
    });
    it('should decline unknown users', function() {
      var req = {};
      var res = {};
      var spy;
      req.auth = {
        username: 'testuser',
        password: 'badpass'
      };
      res.sendStatus = function(status) {
        expect(status).to.eql(401);
      };
      userRoutes.signin(req, res);
    });
    it('should decline incorrect passwords', function() {
      var req;
      var res;
      var spy;
      req = res = {};
      req.auth = {
        username: 'DM',
        password: 'testpass'
      };
      res.sendStatus = function(status) {
        expect(status).to.eql(401);
      };
      userRoutes.signin(req, res);
    });
    it('should prevent incomplete password changes', function() {
      var req;
      var res;
      var spy;
      req = res = {};
      req.body = {};
      spy = res.sendStatus = sinon.spy();
      userRoutes.changePassword(req, res);
      expect(spy.calledOnce).to.eql(true);
      expect(spy.calledWithExactly(400)).to.eql(true);
      spy.reset();
    });
  });
});
