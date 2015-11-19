var xox = angular.module('xox', ['ngRoute', 'angular-locker']);

// configure our routes
xox.
    config(function ($routeProvider) {
        $routeProvider

            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })
            .when('/lobby', {
                templateUrl: 'templates/lobby.html',
                controller: 'LobbyCtrl'
            })
            .when('/game/:gameid', {
                templateUrl: 'templates/game.html',
                controller: 'GameCtrl'
            })
            .otherwise({
                templateUrl: 'templates/landing.html',
                controller: 'LandingCtrl'
            })
    })
    .config(['lockerProvider', function config(lockerProvider) {
        lockerProvider.defaults({
            driver: 'local',
            namespace: false,
            separator: '.',
            eventsEnabled: true,
            extend: {}
        });
    }]);
;