'use strict';

angular.module('barcodeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    // $routeProvider
    //   .when('/', {
    //     templateUrl: 'partials/main',
    //     controller: 'MainCtrl'
    //   })
    //   .otherwise({
    //     redirectTo: '/'
    //   });
      
    $routeProvider
      .when('/', {
        templateUrl: 'partials/barcode',
        controller: 'BarcodeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });