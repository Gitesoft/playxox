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
                self.socket = io(XoxConfig.url + ':' + XoxConfig.port);
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


        var _execute = function (method, options) {

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

        this.delete = function (options) {
            return _execute('DELETE', options);
        };

        this.broadcast = function (event, args) {
            $rootScope.$broadcast(event, args);
        };


    }]);

}());