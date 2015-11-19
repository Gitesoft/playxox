'use strict';

var xox = angular.module('xox', ['ngRoute', 'angular-locker']);

// configure our routes
xox.config(function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    }).when('/lobby', {
        templateUrl: 'templates/lobby.html',
        controller: 'LobbyCtrl'
    }).otherwise({
        templateUrl: 'templates/landing.html',
        controller: 'LandingCtrl'
    });
}).config(['lockerProvider', function config(lockerProvider) {
    lockerProvider.defaults({
        driver: 'local',
        namespace: false,
        separator: '.',
        eventsEnabled: true,
        extend: {}
    });
}]);
;
xox.controller('LandingCtrl', ['$scope', 'locker', '$location', function ($scope, locker, $location) {

    if (locker.get('token') !== undefined) {
        $location.path('/lobby');
    } else {
        $location.path('/login');
    }
}]);
xox.controller('LobbyCtrl', ['$scope', 'locker', '$location', function ($scope, locker, $location) {

    $scope.doLogout = function () {
        //wipe local storage
        locker.pull('token');
        locker.pull('nickname');

        //redirect to home
        $location.path('');
    };
}]);
xox.controller('LoginCtrl', ['$scope', 'locker', '$location', function ($scope, locker, $location) {

    $scope.nickname = "";

    if (locker.get('token') !== undefined) {
        $location.path('/lobby');
    }

    $scope.doLogin = function () {
        var success = function success(response) {
            locker.put('token', response.token);
            locker.put('nickname', response.nickname);
            $location.path('/lobby');
        };

        success({
            nickname: $scope.nickname,
            token: 'asd214askdjla'
        });
    };
}]);