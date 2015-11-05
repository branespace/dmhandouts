'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var mongoose = require('mongoose');
var serverURI = 'localhost:3000/api';
var Adventure = require(__dirname + '/../../models/adventure');
var User = require(__dirname + '/../../models/user');

var adventures = [];

describe('adventure routes', function() {
  var token;

  before(function(done) {
    var newAdventure = new Adventure({
      title: 'Tomb of Horrors',
      unlocked: true,
    });
    var newUser = new User({
      username: 'adventuretestuser',
      basic: {
        username: 'adventuretestuser'
      },
      admin: true
    });
    newAdventure.save(function(err, data) {
      adventures.push(data);
      var newAdventure = new Adventure({
        title: 'White Plume Mountain',
        unlocked: false,
      });
      newAdventure.save(function(err, data) {
        adventures.push(data);
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

  it('should return a list of unlocked adventures', function(done) {
    chai.request(serverURI)
      .get('/adventures')
      .set('token', token)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.length).to.eql(2);
        expect(res.body[0].title).to.eql('Tomb of Horrors');
        done();
      });
  });

  it('should return an unlocked adventure by id', function(done) {
    chai.request(serverURI)
      .get('/adventures/' + adventures[0]._id)
      .set('token', token)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body[0].title).to.eql('Tomb of Horrors');
        done();
      });
  });

  it('should accept renaming', function(done) {
    chai.request(serverURI)
      .patch('/adventures/' + adventures[1]._id)
      .set('token', token)
      .send({title: 'Temple of Elemental Evil'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.title).to.eql('Temple of Elemental Evil');
        done();
      });
  });

});
