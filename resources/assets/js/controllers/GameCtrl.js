xox.controller('GameCtrl', ['$scope', 'locker', '$location', '$routeParams', 'api', function ($scope, locker, $location, $routeParams, api) {

    //login check
    if (api.me === undefined) {
        $location.path('/login');
    }

    $scope.nickname = locker.get('nickname');
    $scope.gameid = $routeParams.gameid;
    $scope.char = 'X';
    $scope.turn = false;

    //$scope.game = [
    //    [null, null, null],
    //    [null, null, null],
    //    [null, null, null],
    //];

    $scope.updateGame = function () {
        $scope.game = api.game.state;

        if (api.game.players[0].id == api.me.id)
            $scope.char = api.game.players[0].char;
        else
            $scope.char = api.game.players[1].char;

        if (api.game.turn == api.me.id)
            $scope.turn = true;
        else
            $scope.turn = false;
    };

    $scope.move = function (i, j) {
        if ($scope.game[i][j] === null) {
            $scope.game[i][j] = angular.copy($scope.char);
        }
    }

    $scope.updateGame();
    $scope.$watch(function () {

        },
        function () {

        });
}]);