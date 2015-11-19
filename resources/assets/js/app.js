var xox = angular.module('xox', ['ngRoute', 'angular-locker']);

// configure our routes
xox.config(function($routeProvider) {
    $routeProvider

    .when('/login', {
      templateUrl : 'templates/login.html',
      controller  : 'LoginCtrl'
    })
});