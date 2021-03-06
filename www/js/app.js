angular.module('iagent', ['ionic', 'ngCordova', 'iagent.controllers'])

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

  $urlRouterProvider.otherwise('/');

  $stateProvider

  .state('home', {
    url: "/",
    templateUrl: "templates/home.html",
    controller: 'HomeCtrl'
  })

  .state('search', {
    url: "/search",
    templateUrl: "templates/form.html",
    controller: 'SearchCtrl'
  })

  .state('profile', {
    url: "/search/profile",
    templateUrl: "templates/profile.html",
    controller: 'ProfileCtrl'
  })
  
  .state('products', {
    url: "/products",
    templateUrl: "templates/products.html",
    controller: 'ProductsCtrl'
  })

  .state('coverages', {
    url: "/products/:id/coverages",
    templateUrl: "templates/coverages.html",
    controller: 'ProductCtrl'
  })

  .state('product_form', {
    url: "/products/:id/user",
    templateUrl: "templates/form.html",
    controller: 'ProductCtrl'
  })

  .state('summary', {
    url: "/products/:id/summary",
    templateUrl: "templates/summary.html",
    controller: 'ProductCtrl'
  });

});
