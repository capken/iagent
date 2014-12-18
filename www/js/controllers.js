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
  $scope.prods = {
  	selectProduct: {},
  	selectedCoverage: {}
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
})

.controller('ProductsCtrl', function($scope, $state) {
  $scope.products = {groups:[]};
  
  $scope.prodChanged = function (prod) {
  	if(prod){
  		$scope.prods.selectProduct = prod;
  		$state.go('coverage');
  	}
  };
  
  $scope.products.groups[0] = {
  	name: '车险',
  	code: 'vehicle',
  	desc:'车险描述'
  };
  $scope.products.groups[1] = {
  	name: '寿险',
  	code: 'life',
  	desc: '寿险描述'
  };
  $scope.products.groups[2] = {
  	name: '旅行意外险',
  	code: 'travel',
  	desc: '旅行意外险描述'
  };
})

.controller('CoverageCtrl', function ($scope, $state) {
  $scope.coverage = {groups:[]};
  
  $scope.selectChanged = function (group) {
    if (group) {
    	$scope.prods.selectedCoverage[group.hasSelected.code] = group.hasSelected;
    }
  };
  
  $scope.next = function () {
  	var prodCover = $scope.prods;
  };
  
  if($scope.prods.selectProduct && $scope.prods.selectProduct.code === 'vehicle'){
  	$scope.coverage.groups[0] = {
	  	name: '机动车强制险',
	  	code: 'OD_G',
	  	desc: '机动车强制险描述',
	    liability: [
	    	{code:'OD_G',value:100000},
	    	{code:'OD_G',value:20000}
	    ]
	  };
	  $scope.coverage.groups[1] = {
	  	name: '第三方责任险',
	  	code: 'TPL_G',
	  	desc: '第三方责任险描述',
	  	liability: [
	    	{code:'TPL_G',value:100000},
	    	{code:'TPL_G',value:20000}
	    ]
	  };
	  $scope.coverage.groups[2] = {
	  	name: '自燃险',
	  	code: 'FIRE_G',
	  	desc: '自燃险描述',
	  	liability: [
	    	{code:'FIRE_G',value:100000},
	    	{code:'FIRE_G',value:20000}
	    ]
	  };
	  $scope.coverage.groups[3] = {
	  	name: '盗抢险',
	  	code: 'TH_G',
	  	desc: '盗抢险描述',
	  	liability: [
	    	{code:'TH_G',value:100000},
	    	{code:'TH_G',value:20000}
	    ]
	  };
  }
});
