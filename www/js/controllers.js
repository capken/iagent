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

  $scope.changeUser = function() {
    if($scope.form.values.email === 'melanie.wang@outlook.com') {
      $scope.form.values = {
        name: 'Steven Huang',
        cellPhone: '13912345678',
        email: 'steven.huang@gmail.com',
        licensePlates: '沪A6U615',
        sdate: new Date()
      };
    } else {
      $scope.form.values = {
        name: 'Melanie Wang',
        cellPhone: '13956712348',
        email: 'melanie.wang@outlook.com',
        licensePlates: '沪D83278',
        sdate: new Date()
      };
    }
  }
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
    { label: 'Vehicle Plate Number', attr: 'licensePlates', type: 'text' }
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

.controller('ProductsCtrl', function ($scope, $ionicLoading, Products) {
  $ionicLoading.show({
    template: 'Loading...'
  });

  Products.all(function(products){
    $scope.products = products;
    $ionicLoading.hide();
  });
})

.controller('ProductCtrl', function($scope, $state, $stateParams, $ionicLoading, Products, Users, Quotation) {
  if($state.is('coverages')) {

    $scope.selectCoverages = function() {
      $scope.form.product = {
        name: $scope.product.name,
        id: $scope.product.id,
        coverages: []
      };

      angular.forEach($scope.product.coverages,
        function(coverage, index) {
          var cov = {
            name: coverage.name,
            uuid: coverage.uuid,
            selected: coverage.selected,
          };

          if(angular.isDefined(coverage.limit)) {
            cov.limit = {
              code: coverage.limit.code,
              value: coverage.limit.value
            };
          }

          $scope.form.product.coverages.push(cov);
        }
      );

      $state.go('summary', {id: $stateParams.id});
    };

    $ionicLoading.show({
      template: 'Loading...'
    });

    var productId = $stateParams.id.replace(':', '_');
    Products.get(productId, function(product){
      $scope.product = product;
      $ionicLoading.hide();
    });

  } else if($state.is('product_form')) {
    $scope.title = 'Policy Form';
 
    $scope.form.fields = [
      { label: 'Name', attr: 'name', type: 'text' },
      { label: 'Cell Phone', attr: 'cellPhone', type: 'text' },
      { label: 'Email', attr: 'email', type: 'email' },
      { label: 'Vehicle Plate Number', attr: 'licensePlates', type: 'text' },
      { label: 'Start Date', attr: 'sdate', type: 'date' }
    ];

    $scope.form.values = {
      name: 'Steven Huang',
      cellPhone: '13912345678',
      email: 'steven.huang@gmail.com',
      licensePlates: '沪A6U615',
      sdate: new Date()
    };
 
    $scope.form.action.target = 'coverages({id: "' + $stateParams.id + '"})';
    $scope.form.action.label = 'Next';
 
  } else if($state.is('summary')) {
    $ionicLoading.show({
      template: 'Loading...'
    });

    Users.get($scope.form.values, function(profile) {
      $scope.user = profile;

      var data = Quotation.buildRequest($scope.form.product, $scope.user);
      console.log(JSON.stringify(data));

      Quotation.calc(data, function(result) {
        console.log(JSON.stringify(result))
        $scope.calcResult = result;
      });

      $ionicLoading.hide();
    });
  }
});
