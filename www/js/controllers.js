angular.module('iagent.controllers', ['iagent.services'])

.controller('MainCtrl', function($scope, $stateParams) {
  $scope.userInfo = {
    name: 'Allen Zheng'
  };
})

.controller('HomeCtrl', function($scope, $stateParams) {
})

.controller('SearchCtrl', function($scope, $state) {
  $scope.query = function() {
    $state.go('profile');
  }
})

.controller('ProfileCtrl', function($scope, $ionicLoading, $timeout, Users) {
  $ionicLoading.show({
    template: 'Searching...'
  });

  $timeout(function() {
    $scope.userProfile = Users.get($scope.userInfo.name);
    if($scope.userProfile === null) {
      $scope.userNotFound = true;
    }
    $ionicLoading.hide();
  }, 1500);
})

.controller('ProductsCtrl', function($scope, $stateParams) {
});
