require(__dirname + '/../../app/js/client');
require('angular-mocks');

describe('resource service', function() {
  beforeEach(angular.mock.module('dmhandouts'));

  var ResourceService;
  var $httpBackend;
  var assetResource;
  beforeEach(angular.mock.inject(function(Resource, _$httpBackend_) {
    ResourceService = Resource;
    $httpBackend = _$httpBackend_;
    assetResource = ResourceService('assets');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should make a get request', function() {
    $httpBackend.expectGET('/api/assets').respond(200, [{test: 'test'}]);
    assetResource.getAll(function(err, data) {
      expect(err).toBe(null);
      expect(Array.isArray(data)).toBe(true);
    });
    $httpBackend.flush();
  });

  it('should make a post request', function() {
    $httpBackend.expectPOST('/api/assets', {test: 'test'}).respond(200);
    assetResource.create({test: 'test'}, function(err, data) {
      expect(err).toBe(null);
    });
    $httpBackend.flush();
  });

  it('should make a patch request', function() {
    $httpBackend.expectPATCH('/api/assets/1', {test: 'test', _id: 1})
        .respond(200);
    assetResource.update({test: 'test', _id: 1}, function(err, data) {
      expect(err).toBe(null);
    });
    $httpBackend.flush();
  });

  it('should make a delete request', function() {
    $httpBackend.expectDELETE('/api/assets/1').respond(200);
    assetResource.remove({test: 'test', _id: 1}, function(err, data) {
      expect(err).toBe(null);
    });
    $httpBackend.flush();
  });

});
