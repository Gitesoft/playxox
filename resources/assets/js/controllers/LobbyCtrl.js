xox.controller('LobbyCtrl', ['$scope', 'locker', '$location', 'api', function ($scope, locker, $location, api) {

    if (api.me === undefined) {
        $location.path('/login');
    }

    api.gameListenChannel = 'private-' + api.me.id;

    $scope.joinLobby = function (type) {
        api.createSocket();
        api.socket.emit('joinlobby', {
            id: api.me.id,
            type: type
        });

        //
        //var dummyGame = {
        //    "id": "34431", // game-id
        //    "players": [
        //        {
        //            //id: "3", // user-id
        //            id: api.me.id,
        //            char: "X",
        //            nickname: "aozisik"
        //        },
        //        {
        //            id: "5", // user-id
        //            char: "O",
        //            nickname: "ilterocal"
        //        }
        //    ],
        //    turn: "3", // user-id
        //    state: [
        //        [null, null, "O"],
        //        [null, null, "O"],
        //        ["X", "X", null]
        //    ],
        //    winner: null // veya kazanan kullanıcının id'si
        //};
        //
        //$scope.startGame(dummyGame);

        api.socket.on(api.gameListenChannel, function (data) {
            console.log(data);
            $scope.startGame(data);
        });
    };

    $scope.quitLobby = function () {
        api.createSocket();
        api.socket.emit('quitlobby', {
            id: api.me.id
        });

        api.socket.removeAllListeners($scope.gameListenChannel);
    };

    $scope.doLogout = function () {
        $scope.quitLobby();

        //wipe local storage
        locker.pull('me');
        api.me = undefined;

        //redirect to home
        $location.path('');
    };

    $scope.startGame = function (game) {
        api.game = game;
        $location.path('/game/' + game.id);
    }
}]);