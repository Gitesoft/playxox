xox.controller('LobbyCtrl', ['$scope', 'locker', '$location', 'api', function ($scope, locker, $location, api) {

    if (api.me === undefined) {
        $location.path('/login');
    }

    $scope.joinLobby = function (type) {
        api.createSocket();
        api.socket.emit('joinlobby', {
            type: type
        });
    }

    $scope.doLogout = function () {
        //wipe local storage
        locker.pull('me');
        api.me = undefined;

        //redirect to home
        $location.path('');
    }
}]);