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
        $scope.me = null;
        $scope.opponent = null;
        $scope.winner = null;
        $scope.updateGame = function (game) {
            $scope.game = game.state;

            if (game.players[0].id == api.me.id) {
                $scope.char = game.players[0].char;
                $scope.me = game.players[0];
                $scope.opponent = game.players[1];
            }
            else {
                $scope.char = game.players[1].char;
                $scope.me = game.players[1];
                $scope.opponent = game.players[0];
            }

            if (game.turn == api.me.id)
                $scope.turn = true;
            else
                $scope.turn = false;

            $scope.winner = game.winner;
        };

        $scope.move = function (i, j) {

            if ($scope.turn === false || $scope.winner !== null) {
                return;
            }

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

        $scope.updateGame(api.game);

        api.socket.on("game-" + api.game.id, function (data) {
            $scope.updateGame(data);
        });

        $scope.getWinnerClass = function () {
            if ($scope.winner === null) {
                return 'btn-default';
            }
            else if ($scope.winner === '-') {
                return 'btn-warning';
            }
            else if ($scope.winner == $scope.me.id) {
                return 'btn-success';
            }
            else {
                return 'btn-danger';
            }
        }

        $scope.getWinner = function () {
            if ($scope.winner === null) {
                return 'btn-default';
            }
            else if ($scope.winner === '-') {
                return 'It is a draw!';
            }
            else if ($scope.winner == $scope.me.id) {
                return 'You won !';
            }
            else {
                return 'You lost :(';
            }
        }
    }
}]);