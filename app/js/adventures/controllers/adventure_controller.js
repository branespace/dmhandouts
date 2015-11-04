module.exports = function(app) {
  app.controller('AdventureController', ['$scope', '$rootScope', '$location',
      'Resource', function($scope, $rootScope, $location, Resource) {
        var adventure = $rootScope.adventure;
        $scope.assets = [];

        var assetResource = Resource('assets');
        $scope.getAll = function() {
          console.log('test');
          assetResource.getAll(function(err, data) {
            if (err) {
              $scope.error = 'Internal Server Error';
            }
            for (var i = 0; i < data.length; i++) {
              if (data[i].type === 'global') {
                $scope.assets.push(data[i]);
              }
            }
          });
        };

        $scope.loadAsset = function(asset) {
          $rootScope.asset = asset;
          $location.path('/asset');
        };

        $scope.loadMap = function() {
          $location.path('/map');
        };

      }]);
};
