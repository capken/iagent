angular.module('iagent', ['ionic', 'iagent.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('home', {
    url: "/home",
    views: {
      'mainContent': {
        templateUrl: "templates/home.html",
        controller: 'HomeCtrl'
      }
    }
  })

  .state('search', {
    url: "/search",
    views: {
      'mainContent': {
        templateUrl: "templates/search.html",
        controller: 'SearchCtrl'
      }
    }
  })

  .state('profile', {
    url: "/profile",
    views: {
      'mainContent': {
        templateUrl: "templates/profile.html",
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('products', {
    url: "/products",
    views: {
      'mainContent': {
        templateUrl: "templates/products.html",
        controller: 'ProductsCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/home');
});
