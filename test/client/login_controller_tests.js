require(__dirname + '/../../app/js/client');
require('angular-mocks');

describe('signin controller', function() {
  beforeEach(angular.mock.module('dmhandouts'));

  var cookie = {
    put: function() {}
  };
  var location = {
    path: function() {}
  };
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should create the controller', function() {
    var controller = new $ControllerConstructor(
        'SigninController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(typeof $scope.user).toBe('object');
  });

  it('should disable buttons correctly', function() {
    var controller = new $ControllerConstructor(
        'SigninController', {$scope: $scope});
    expect($scope.disableButton()).toBe(true);
    $scope.user.username = 'ted';
    expect($scope.disableButton()).toBe(true);
    $scope.user.password = 'password';
    expect($scope.disableButton()).toBe(false);
  });

  describe('http requests', function() {
    var $httpbackend;
    beforeEach(angular.mock.inject(function($rootScope, $controller,
          $httpBackend) {
      $scope = $rootScope.$new();
      $ControllerConstructor = $controller;
      $httpbackend = $httpBackend;
    }));

    afterEach(function() {
      $httpbackend.verifyNoOutstandingExpectation();
      $httpbackend.verifyNoOutstandingRequest();
    });

    it('should send user details and store cookie', function() {
      spyOn(cookie, 'put').and.returnValue('');
      spyOn(location, 'path').and.returnValue('');
      var controller = new $ControllerConstructor(
          'SigninController', {$scope: $scope, $location: location,
          $cookies: cookie});
      $httpbackend.expectGET('/api/signin').respond(200, {token: 'test'});
      $httpbackend.expectGET('/api/username').respond(200, {username: 'test'});
      $scope.user.username = 'ted';
      $scope.user.password = 'fish';
      $scope.send($scope.user);
      $httpbackend.flush();
      expect(cookie.put).toHaveBeenCalledWith('token', 'test');
      expect(location.path).toHaveBeenCalledWith('/user');
    });
  });

});
