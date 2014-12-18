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
  $scope.groups = [];
  $scope.selectProduct;
  $scope.groups[0] = {
  	name: '车险',
  	code: '',
    items: [],
    show: false
  };
  $scope.groups[1] = {
  	name: '寿险',
  	code: '',
    items: [],
    show: false
  };
  $scope.groups[2] = {
  	name: '旅行意外险',
  	code: '',
    items: [],
    show: false
  };
  
  $scope.groups[0].items.push('车险详细介绍');
  $scope.groups[1].items.push('寿险详细介绍');
  $scope.groups[2].items.push('旅行意外险详细介绍');
  // for (var i=0; i<4; i++) {
    // $scope.groups[i] = {
      // name: i,
      // items: [],
      // show: false
    // };
    // for (var j=0; j<3; j++) {
      // $scope.groups[i].items.push(i + '-' + j);
    // }
  // }
  
  $scope.toggleGroup = function(group) {
  	$scope.selectProduct = group;
  	shrinkAllGroup();
    group.show = !group.show;
  };
  
  $scope.isGroupShown = function(group) {
    return group.show;
  };
  
  function shrinkAllGroup(){
  	if($scope.groups){
  		for (var i=0; i<$scope.groups.length; i++){
  			$scope.groups[i].show = false;
  		}
  	}
  }
})

.controller('CoverageCtrl', function($scope) {
  $scope.groups = [];
  $scope.groups[0] = {
  	name: '机动车强制险',
    items: [],
    show: false
  };
  $scope.groups[1] = {
  	name: '第三方责任险',
    items: [],
    show: false
  };
  $scope.groups[2] = {
  	name: '玻璃险',
    items: [],
    show: false
  };
  $scope.groups[3] = {
  	name: '盗抢险',
    items: [],
    show: false
  };
  $scope.groups[0].items.push('限额1000000');
  $scope.groups[0].items.push('保额1000000');
  $scope.groups[1].items.push('限额10000007');
  $scope.groups[2].items.push('限额10000008');
  $scope.groups[3].items.push('限额10000009');
  // for (var i=0; i<4; i++) {
    // $scope.groups[i] = {
      // name: i,
      // items: [],
      // show: false
    // };
    // for (var j=0; j<3; j++) {
      // $scope.groups[i].items.push(i + '-' + j);
    // }
  // }
  
  $scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };
});
