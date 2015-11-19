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
            if (this.socket === null) {
                this.socket = io(XoxConfig.url + ':3000');
            }
        };

        this.createSocket();

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

    }]);

}());