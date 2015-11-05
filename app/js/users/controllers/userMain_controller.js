module.exports = function(app) {
  app.controller('UserMainController', ['$scope', 'Resource', '$cookies',
      '$http', '$location', 'Persist',
      function($scope, Resource, $cookies, $http, $location, Persist) {
        var token = $cookies.get('token') ;
        if (!(token && token.length)) {
          $location.path('/signup');
        }

        $http.defaults.headers.common.token = token;
        $scope.adventures = $scope.adventures || [];

        var adventureResource = Resource('adventures');

        $scope.getAll = function() {
          adventureResource.getAll(function(err, data) {
            if (err) {
              $scope.error = 'Internal Server Error.  Please refresh the page';
            } else {
              $scope.adventures = data;
            }
          });
        };

        $scope.loadAdventure = function(adventure) {
          $http.defaults.headers.common.adventure = adventure.title;
          Persist.set('adventure', adventure);
          $location.path('/adventure');
        };

      }]);
};
