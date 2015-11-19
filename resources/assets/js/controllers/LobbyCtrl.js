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