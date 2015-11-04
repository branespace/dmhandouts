module.exports = function(dmhandouts) {
  dmhandouts.config(['$routeProvider', function($route) {
    $route
      .when('/', {
        redirectTo: '/signup'
      })
      .when('/user', {
        templateUrl: 'templates/users/views/userMain_view.html',
        controller: 'UserMainController'
      })
      .when('/signup', {
        templateUrl: 'templates/users/views/signupin_view.html',
        controller: 'SignupController'
      })
      .when('/signin', {
        templateUrl: 'templates/users/views/signupin_view.html',
        controller: 'SigninController'
      })
      .when('/adventure', {
        templateUrl: 'templates/adventures/views/adventure_view.html',
        controller: 'AdventureController'
      })
      .otherwise({
        redirectTo: '/signup'
      });
  }]);
};
