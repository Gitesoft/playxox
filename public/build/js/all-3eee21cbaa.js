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
xox.controller('GameCtrl', ['$scope', 'locker', '$location', '$routeParams', 'api', '$timeout', function ($scope, locker, $location, $routeParams, api, $timeout) {

    //login check
    if (api.me === undefined) {
        $location.path('/login');
    } else if (api.game === null) {
        $location.path('/lobby');
    } else {

        $scope.gameid = $routeParams.gameid;
        $scope.char = 'X';
        $scope.turn = false;
        $scope.me = null;
        $scope.opponent = null;
        $scope.winner = null;
        $scope.updateGame = function (game) {
            console.log(game);
            $scope.game = game.state;

            var keys = Object.keys(game.players);

            var p1 = keys[0];
            var p2 = keys[1];

            if (game.players[p1].id == api.me.id) {
                $scope.char = game.players[p1].char;
                $scope.me = game.players[p1];
                $scope.opponent = game.players[p2];
            } else {
                $scope.char = game.players[p2].char;
                $scope.me = game.players[p2];
                $scope.opponent = game.players[p1];
            }

            if (game.turn == api.me.id) $scope.turn = true;else $scope.turn = false;

            $scope.winner = game.winner;
        };

        $scope.move = function (i, j) {

            if ($scope.turn === false || $scope.winner !== null) {
                return;
            }

            if ($scope.game[i][j] === null) {
                $scope.game[i][j] = angular.copy($scope.char);
            }

            var success = function success(response) {
                console.log('move ok');
            };

            var error = function error(response) {
                console.log('move not ok');
            };

            var target = i + ',' + j;
            var options = {
                'url': 'game/' + api.game.id + '/move',
                'params': {
                    token: api.me.token,
                    target: target
                }
            };

            api.get(options).success(success).error(error);
        };

        $scope.updateGame(api.game);

        api.socket.on("game-" + api.game.id, function (data) {
            $timeout(function () {
                $scope.updateGame(data);
            });
        });

        $scope.getWinnerClass = function () {
            if ($scope.winner === null) {
                return 'btn-default';
            } else if ($scope.winner === '-') {
                return 'btn-warning';
            } else if ($scope.winner == $scope.me.id) {
                return 'btn-success';
            } else {
                return 'btn-danger';
            }
        };

        $scope.getWinner = function () {
            if ($scope.winner === null) {
                return 'btn-default';
            } else if ($scope.winner === '-') {
                return 'It is a draw!';
            } else if ($scope.winner == $scope.me.id) {
                return 'You won !';
            } else {
                return 'You lost :(';
            }
        };
    }
}]);
xox.controller('LobbyCtrl', ['$scope', 'locker', '$location', 'api', '$timeout', function ($scope, locker, $location, api, $timeout) {

    if (api.me === undefined) {
        $location.path('/login');
    } else {

        $scope.api = api;

        api.gameListenChannel = 'private-' + api.me.id;

        $scope.joinLobby = function (type) {
            api.joinLobby(type);
        };

        $scope.quitLobby = function () {
            api.quitLobby();
        };

        $scope.doLogout = function () {
            $scope.quitLobby();

            //wipe local storage
            locker.pull('me');
            api.me = undefined;

            //redirect to home
            $location.path('');
        };

        $scope.$on('startgame', function (event, game) {
            console.log('startgame event fired, go to: ' + '/game/' + game.id);
            $timeout(function () {
                $location.path('/game/' + game.id);
            });
        });
    }
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

    xox.service('api', ['$rootScope', '$http', 'locker', '$location', function ($rootScope, $http, locker, $location) {

        var self = this;

        this.me = locker.get('me');

        this.game = null;
        this.gameListenChannel = null;

        this.updateGame = function (game) {
            this.broadcast('startgame', game);
            self.game = game;
        };

        //SOCKET STUFF
        this.socket = null;

        this.createSocket = function () {
            if (self.socket === null) {
                self.socket = io(XoxConfig.url + ':3000');
            }
        };

        this.createSocket();

        //END SOCKET STUFF

        //LOBBY MANAGEMENT
        this.joinLobby = function (type) {
            self.socket.emit('joinlobby', {
                id: self.me.id,
                type: type
            });

            self.socket.on(self.gameListenChannel, function (data) {
                self.updateGame(data);
                //WHen game starts,quit from lobby and stop listening the lobby
                self.quitLobby();
            });
        };

        this.quitLobby = function () {
            self.socket.emit('quitlobby', {
                id: self.me.id
            });
            self.socket.removeAllListeners(self.gameListenChannel);
        };
        //END LOBBY MANAGEMENT

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

        this.broadcast = function (event, args) {
            $rootScope.$broadcast(event, args);
        };
    }]);
})();