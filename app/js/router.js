module.exports = function(dmhandouts) {
  dmhandouts.config(['$routeProvider', function($route) {
    $route
      .when('/', {
        redirectTo: '/signup'
      })
      .when('/signup', {
        templateUrl: 'templates/users/views/signupin_view.html',
        controller: 'SignupController'
      })
      .when('/signin', {
        templateUrl: 'templates/users/views/signupin_view.html',
        controller: 'SigninController'
      })
      .otherwise({
        redirectTo: '/signup'
      });
  }]);
};
