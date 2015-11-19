xox.controller('LobbyCtrl', ['$scope', 'locker', '$location', 'api', function ($scope, locker, $location, api) {

    if (api.me === undefined) {
        $location.path('/login');
    }

    $scope.joinLobby = function (type) {
        api.createSocket();
        api.socket.emit('joinlobby', {
            id: api.me.id,
            type: type
        });
    };

    $scope.quitLobby = function () {
        api.createSocket();
        api.socket.emit('quitlobby', {
            id: api.me.id
        });
    };

    $scope.doLogout = function () {
        $scope.quitLobby();

        //wipe local storage
        locker.pull('me');
        api.me = undefined;

        //redirect to home
        $location.path('');
    }
}]);