xox.controller('GameCtrl', ['$scope', 'locker', '$location', '$routeParams', 'api', function ($scope, locker, $location, $routeParams, api) {

    //login check
    if (api.me === undefined) {
        $location.path('/login');
    } else if (api.game === null) {
        $location.path('/lobby');
    } else {

        $scope.gameid = $routeParams.gameid;
        $scope.char = 'X';
        $scope.turn = false;

        console.log('here');

        $scope.updateGame = function (game) {
            $scope.game = game.state;

            if (game.players[0].id == api.me.id)
                $scope.char = game.players[0].char;
            else
                $scope.char = game.players[1].char;

            if (game.turn == api.me.id)
                $scope.turn = true;
            else
                $scope.turn = false;
        };

        $scope.move = function (i, j) {
            if ($scope.game[i][j] === null) {
                $scope.game[i][j] = angular.copy($scope.char);
            }

            var success = function (response) {
                console.log('move ok');
            };

            var error = function (response) {
                console.log('move not ok');
            };

            var target = i + ',' + j;
            var options = {
                'url': 'game/' + $scope.game.id + '/move',
                'params': {
                    token: api.me.token,
                    target: target
                }
            };

            api.get(options).success(success).error(error);
        };

        console.log('here2');

        $scope.updateGame(api.game);

        api.socket.on("game-" + api.game.id, function (data) {
            $scope.updateGame(data);
        });
    }
}]);