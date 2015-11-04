module.exports = function(app) {
  app.controller('SignupController', ['$scope', '$http', '$location',
      '$cookies', function($scope, $http, $location, $cookies) {
        $scope.user = {};
        $scope.signup = true;
        $scope.buttonText = 'Register';
        $scope.switchButtonText = 'Sign In';
        $scope.h1Text = 'Register';

        $scope.passwordMatch = function(user) {
          return user.password === user.confirmation;
        };

        $scope.disableButton = function(user) {
          return ($scope.userForm.$invalid || !$scope.passwordMatch(user) ||
              !$scope.user.signupCode || !$scope.user.email);
        };

        $scope.switchForm = function() {
          return $location.path('/signin');
        };

        $scope.send = function(user) {
          $http.post('/api/signup', user)
            .then(function(res) {
              $cookies.put('token', res.data.token);
              $scope.getUserName(function(err) {
                $scope.error = err;
              });
              $location.path('/user');
            }, function(res) {
              if (res.status === 401) {
                $scope.error = 'Incorrect signup code';
              } else if (res.status === 500) {
                $scope.error = 'Oops! Server error. Please try again';
              }
            });
        };

      }]);
};
