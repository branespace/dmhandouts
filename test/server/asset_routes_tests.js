'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var mongoose = require('mongoose');
var serverURI = 'localhost:3000/api';
var Asset = require(__dirname + '/../../models/asset');
var User = require(__dirname + '/../../models/user');

var assets = [];

describe('asset routes', function() {
  var token;

  before(function(done) {
    var newAsset = new Asset({
      name: 'Tomb of Horrors Entry',
      uri: '/test/test/test',
      adventure: 'Tomb of Horrors',
      unlocked: true,
      comments: [{
        user: 'Freddy',
        date: Date.now(),
        body: 'I\m excited!'
      }]
    });
    var newUser = new User({
      username: 'assettestuser',
      basic: {
        username: 'assettestuser'
      }
    });
    newAsset.save(function(err, data) {
      assets.push(data);
      var newAsset = new Asset({
        name: 'White Plume Mountain Entry',
        uri: '/test/test/test',
        adventure: 'White Plume Mountain',
        unlocked: false,
        comments: [{
          user: 'Shaggy',
          date: Date.now(),
          body: 'I\m scared!'
        }]
      });
      newAsset.save(function(err, data) {
        assets.push(data);
        newUser.generateHash('pwd', function(err, hash) {
          newUser.save(function(err, data) {
            newUser.generateToken(function(err, newToken) {
              token = newToken;
              done();
            });
          });
        });
      });
    });
  });

  it('should return a list of unlocked assets', function(done) {
    chai.request(serverURI)
      .get('/assets')
      .set('token', token)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.length).to.eql(1);
        expect(res.body[0].name).to.eql('Tomb of Horrors Entry');
        done();
      });
  });

  it('should return an unlocked asset by id', function(done) {
    chai.request(serverURI)
      .get('/assets/' + assets[0]._id)
      .set('token', token)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.name).to.eql('Tomb of Horrors Entry');
        done();
      });
  });

  it('should not return a locked asset by id', function(done) {
    chai.request(serverURI)
      .get('/assets/' + assets[1]._id)
      .set('token', token)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(404);
        done();
      });
  });

  it('should accept new comments', function(done) {
    chai.request(serverURI)
      .patch('/assets/' + assets[0]._id)
      .set('token', token)
      .send({comment: {
        user: 'elflord',
        date: Date.now(),
        body: 'P|-|34r |\/|3'
      }})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.comments[1].user).to.eql('elflord');
        done();
      });
  });

});
