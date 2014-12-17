angular.module('iagent.controllers', ['iagent.services'])

.controller('MainCtrl', function($scope, $stateParams) {
  $scope.form = {
    values: {},
    action: {},
    reset: function() {
      this.values = {};
      this.action = {};
    }
  };
})

.controller('HomeCtrl', function($scope, $stateParams) {
})

.controller('SearchCtrl', function($scope, $state) {
  $scope.title = 'Search Form';

  $scope.form.reset();

  $scope.form.fields = [
    { label: 'Name', attr: 'name', type: 'text' },
    { label: 'Cell Phone', attr: 'phone', type: 'text' },
    { label: 'Email', attr: 'email', type: 'email' },
    { label: 'License Plates', attr: 'plates', type: 'text' }
  ];

  $scope.form.action.target = 'profile';
  $scope.form.action.icon = 'ion-search';

  $scope.query = function() {
    $state.go('profile');
  }
})

.controller('ProfileCtrl', function($scope, $ionicLoading, $timeout, Users) {
  $ionicLoading.show({
    template: 'Searching...'
  });

  $timeout(function() {
    $scope.userProfile = Users.get($scope.form.values.name);
    if($scope.userProfile === null) {
      $scope.userNotFound = true;
    }
    $ionicLoading.hide();
  }, 1500);
})

.controller('ProductsCtrl', function($scope, $stateParams) {
})

.controller('ProductCtrl', function($scope, $state, $stateParams) {
  if($state.is('product_form')) {
    $scope.title = 'Policy Form';

    $scope.form.reset();

    $scope.form.fields = [
      { label: 'Name', attr: 'name', type: 'text' },
      { label: 'Cell Phone', attr: 'phone', type: 'text' },
      { label: 'Email', attr: 'email', type: 'email' },
      { label: 'License Plates', attr: 'plates', type: 'text' },
      { label: 'Start Date', attr: 'sdate', type: 'date' }
    ];

    $scope.form.action.target = 'summary';
    $scope.form.action.label = 'Next';

  } else if($state.is('summary')) {

  }
});
