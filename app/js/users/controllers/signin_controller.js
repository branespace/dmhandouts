module.exports = function(app) {
  app.controller('SigninController', ['$scope', '$http', '$base64',
      '$location', '$cookies', function($scope, $http, $base64,
      $location, $cookies) {
        $scope.user = {};
        $scope.buttonText = 'Sign In';
        $scope.switchButtonText = 'Register';
        $scope.h1Text = 'Sign In';
        $scope.signup = false;

        $scope.disableButton = function(user) {
          return !($scope.user.username && $scope.user.password);
        };

        $scope.send = function(user) {
          $http({
            method: 'GET',
            url: '/api/signin',
            headers: {
              'Authorization': 'Basic ' + $base64.encode(user.username +
                  ':' + user.password)
            }
          })
          .then(function(res) {
            $cookies.put('token', res.data.token);
            $scope.getUserName(function(res) {
              $scope.error = res;
            });
            $location.path('/user');
          }, function(res) {
            if (res.status === 500) {
              $scope.error = 'Oops!  We had a server error!  Please try again';
            } else if (res.status === 401) {
              $scope.error = 'Bluff check failed. Try a REAL login';
            }
          });
        };

        $scope.switchForm = function() {
          return $location.path('/signup');
        };
      }]);
};
