module.exports = function(app) {
  app.run(['$rootScope', '$cookies', '$location', '$http', function($scope,
        $cookies, $location, $http) {

    $scope.loggedIn = function() {
      var token = $cookies.get('token');
      return token && token.length;
    };

    $scope.logOut = function() {
      $cookies.remove('token');
      $location.path('/signin');
    };

    $scope.getUserName = function(callback) {
      var token = $cookies.get('token');
      if (!(token && token.length)) {
        callback('Not logged in');
      }
      $http({
        method: 'GET',
        url: '/api/username',
        headers: {
          token: token
        }
      })
      .then(function(res) {
        $scope.username = res.data.username;
      }, function(res) {
        callback('Server Error.  Please try logging in');
      });
    };
  }]);
};
