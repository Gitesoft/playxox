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
                redirectTo: '/lobby'
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
    }])
    .config(['$httpProvider', function ($httpProvider) {

        /***** CONFIGURE HTTP PROVIDER FOR POST REQUESTS ***********/

        $httpProvider.defaults.headers
            .common['X-Requested-With'] = 'XMLHttpRequest';

        $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function (obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function (data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    }])
    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    })
;