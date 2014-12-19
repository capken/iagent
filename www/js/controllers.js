angular.module('iagent.controllers', ['iagent.services'])

.controller('MainCtrl', function($scope, $stateParams) {
  $scope.form = {
    product:{},
    values: {},
    action: {},
    reset: function() {
      this.values = {};
      this.action = {};
    }
  };
  // $scope.product = {};
})

.controller('HomeCtrl', function($scope, $stateParams) {
})

.controller('SearchCtrl', function($scope, $state) {
  $scope.title = 'Search Form';

  $scope.form.reset();

  $scope.form.fields = [
    { label: 'Name', attr: 'name', type: 'text' },
    { label: 'Cell Phone', attr: 'cellPhone', type: 'text' },
    { label: 'Email', attr: 'email', type: 'email' },
    { label: 'License Plates', attr: 'licensePlates', type: 'text' }
  ];

  $scope.form.values = {
    name: 'Melanie Wang',
    cellPhone: '13956712348',
    email: 'melanie.wang@outlook.com',
    licensePlates: '沪D83278',
    sdate: new Date()
  };

  $scope.form.action.target = 'profile';
  $scope.form.action.icon = 'ion-search';

  $scope.query = function() {
    $state.go('profile');
  };
})

.controller('ProfileCtrl', function($scope, $ionicLoading, Users) {
  $ionicLoading.show({
    template: 'Searching...'
  });

  Users.get($scope.form.values, function(profile) {
    $scope.userProfile = profile
    if(profile == null) {
      $scope.userNotFound = true;
    }
    $ionicLoading.hide();
  });
})

.controller('ProductCtrl', function($scope, $state, $stateParams, $ionicLoading, Users, Quotation) {
  if($state.is('product_form')) {
    $scope.title = 'Policy Form';
  
    $scope.form.reset();
 
    $scope.form.fields = [
      { label: 'Name', attr: 'name', type: 'text' },
      { label: 'Cell Phone', attr: 'cellPhone', type: 'text' },
      { label: 'Email', attr: 'email', type: 'email' },
      { label: 'License Plates', attr: 'licensePlates', type: 'text' },
      { label: 'Start Date', attr: 'sdate', type: 'date' }
    ];

    $scope.form.values = {
      name: 'Steven Huang',
      cellPhone: '13912345678',
      email: 'steven.huang@gmail.com',
      licensePlates: '沪A6U615',
      sdate: new Date()
    };
 
    $scope.form.action.target = 'summary';
    $scope.form.action.label = 'Next';
 
  } else if($state.is('summary')) {
    $ionicLoading.show({
      template: 'Searching...'
    });

    // build up the request data
    var data = {};

    Users.get($scope.form.values, function(profile) {
      $scope.user = profile;

      Quotation.calc(data, function(result) {
        console.log(JSON.stringify(result))
        $scope.calcResult = result;
      });

      $ionicLoading.hide();
    });
  }
})

.controller('ProductsCtrl', function ($scope, $state) {
  $scope.products = {
    groups: []
  };

  $scope.prodChanged = function (prod) {
    if (prod) {
      $scope.form.product = prod;
      $state.go('coverage');
    }
  };

  $scope.products.groups[0] = {
    name: "Basic Private Motor Car",
    id: "prod:1",
    code: "BPMC",
    desc: "This auto product is designed for private car owners with basic insurance expectations.",
    coverages: [{
      name: "Third Party Liability",
      code: "VTPL",
      desc: "Third Party Liability",
      limitValues: [
        50000,
        1000000,
        2000000,
        3000000
      ]
    }, 
    {
      name: "Own Auto Damage",
      code: "GOD",
      desc: "Own Auto Damage",
      limitValues: []
    }, 
    {
      name: "Theft",
      code: "RANDT",
      desc: "Theft",
      hasSelected: 'false',
      limitValues: []
    }, {
      name: "Personal Accident to Driver",
      code: "DPL",
      desc: "Personal Accident to Driver",
      limitValues: [
        50000,
        1000000,
        2000000,
        3000000
      ]
    }, 
    {
      name: "Window Breakage",
      code: "GLASS",
      desc: "Window Breakage",
      limitValues: []
    }, 
    {
      name: "Scrape",
      code: "SCRAPE",
      desc: "Scrape",
      hasSelected: 'false',
      limitValues: [
        1000,
        2000,
        3000
      ]
    }, 
    {
      name: "Self-ignition",
      code: "FIRE_IGN",
      desc: "Self-ignition",
      limitValues: []
    }]
  };
})

.controller('CoverageCtrl', function ($scope, $state) {

  $scope.limitChanged = function (group) {
    if (group && group.limit) {
      group.hasSelected = 'true';
    } else {
      group.hasSelected = 'false';
    }
  };

  $scope.showLimit = function (group) {
    if (group && group.limitValues.length <= 0) {
      return false;
    }
    return true;
  };

  $scope.next = function () {
    $state.go('product_form');
  };

  // if ($scope.form.product) {
  //   $scope.coverage.groups = $scope.form.product.coverages;
  // }
});
