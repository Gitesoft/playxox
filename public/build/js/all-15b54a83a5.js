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
    }).when('/game/:gameid', {
        templateUrl: 'templates/game.html',
        controller: 'GameCtrl'
    }).otherwise({
        redirectTo: '/lobby'
    });
}).config(['lockerProvider', function config(lockerProvider) {
    lockerProvider.defaults({
        driver: 'local',
        namespace: false,
        separator: '.',
        eventsEnabled: true,
        extend: {}
    });
}]).config(['$httpProvider', function ($httpProvider) {

    /***** CONFIGURE HTTP PROVIDER FOR POST REQUESTS ***********/

    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function param(obj) {
        var query = '',
            name,
            value,
            fullSubName,
            subName,
            subValue,
            innerObj,
            i;

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
            } else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value !== undefined && value !== null) query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
}]).directive('ngEnter', function () {
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
});
xox.controller('GameCtrl', ['$scope', 'locker', '$location', '$routeParams', 'api', function ($scope, locker, $location, $routeParams, api) {

    //login check
    if (locker.get('token') === undefined) {
        $location.path('/lobby');
    }

    $scope.nickname = locker.get('nickname');
    $scope.gameid = $routeParams.gameid;
    $scope.char = 'X';

    $scope.game = [[null, null, null], [null, null, null], [null, null, null]];

    $scope.move = function (i, j) {
        if ($scope.game[i][j] === null) {
            $scope.game[i][j] = angular.copy($scope.char);
        }
    };
}]);
xox.controller('LobbyCtrl', ['$scope', 'locker', '$location', 'api', function ($scope, locker, $location, api) {

    if (api.me === undefined) {
        $location.path('/login');
    }

    $scope.joinLobby = function (type) {
        api.createSocket();
        api.socket.emit('joinlobby', {
            type: type
        });
    };

    $scope.doLogout = function () {
        //wipe local storage
        locker.pull('me');
        api.me = undefined;

        //redirect to home
        $location.path('');
    };
}]);
xox.controller('LoginCtrl', ['$scope', 'locker', '$location', 'api', function ($scope, locker, $location, api) {

    if (locker.get('token') !== undefined) {
        $location.path('/lobby');
    }

    $scope.nickname = "";
    $scope.errors = null;

    $scope.doLogin = function () {

        var success = function success(response) {
            $scope.errors = null;
            api.me = response;
            locker.put('me', response);
            $location.path('/lobby');
        };

        var error = function error(response) {
            $scope.errors = response;
        };

        var options = {
            'url': 'register',
            'data': {
                nickname: $scope.nickname
            }
        };
        api.post(options).success(success).error(error);
    };
}]);
(function () {

    'use strict';

    var xox = angular.module('xox');

    xox.service('api', ['$rootScope', '$http', 'locker', function ($rootScope, $http, locker) {

        var self = this;

        this.me = locker.get('me');

        this.broadcast = function (event, args) {
            $rootScope.$broadcast(event, args);
        };

        this.socket = null;

        this.createSocket = function () {
            if (this.socket === null) this.socket = io(XoxConfig.url + ':3000', { query: "user_id=" + this.me.id });
        };

        var _execute = function _execute(method, options) {

            var config = {
                'method': method,
                'url': '/api/'
            };

            if (options !== undefined && angular.isObject(options) === true) {

                if (options.url !== undefined) {
                    config.url += options.url;
                }

                if (options.data !== undefined) {
                    config.data = options.data;
                }

                if (options.params !== undefined) {
                    config.params = options.params;
                }
            }

            return $http(config);
        };

        this.get = function (options) {
            return _execute('GET', options);
        };

        this.post = function (options) {
            return _execute('POST', options);
        };

        this.put = function (options) {
            return _execute('PUT', options);
        };

        this['delete'] = function (options) {
            return _execute('DELETE', options);
        };
    }]);
})();