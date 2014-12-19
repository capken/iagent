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
    $scope.userProfile = profile;
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

.controller('ProductsCtrl', function ($scope, $state, ProcuctService) {
  $scope.products = {};

  ProcuctService.get(function (data){
    if (data) {
      $scope.products.groups = data;
    }
  });

  $scope.prodChanged = function (prod) {
    if (prod) {
      $scope.form.product.id = prod.id;
      $state.go('coverage');
    }
  };
})

.controller('CoverageCtrl', function ($scope, $state, ProcuctCoveragesService) {
  $scope.coverages = {};

  ProcuctCoveragesService.get($scope.form.product.id, function (data) {
    if (data) {
      $scope.coverages.groups = data;
    }
  });

  $scope.limitChanged = function (group) {
    if (group && group.limitValue) {
      group.hasSelected = 'true';
    } else {
      group.hasSelected = 'false';
    }
  };

  $scope.showLimit = function (group) {
    if (group && group.limit && group.limit.values.length > 0) {
      return true;
    }
    return false;
  };

  $scope.next = function () {
    $scope.form.product.coverages = [];
    angular.forEach($scope.coverages.groups.coverages, function(value, key) {
      var limitCode = '';
      if (value) {
        if(value.limit){
          limitCode = value.limit.code;
        }
        var coverage = {
          "uuid":  value.uuid,
          "selected": value.hasSelected,
          "limitValue": value.limitValue,
          "limitCode": limitCode
        };
        this.push(coverage);
      }
    }, $scope.form.product.coverages);
    $state.go('product_form');
  };
});
