module.exports = function(app) {
  app.controller('AssetController', ['$scope', 'Persist', '$location',
      'Resource', function($scope, Persist, $location, Resource) {
        $scope.asset = Persist.get('asset');
        $scope.comments = [];
        var commentResource = Resource('comment');

        $scope.loadAsset = function() {
          commentResource.get($scope.asset._id, function(err, data) {
            if (err) { $scope.error = 'Server Error'; }
            $scope.comments = data;
          });
        };

        $scope.back = function() {
          $location.path('/adventure');
        };

      }]);
};
