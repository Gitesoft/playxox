xox.controller('GameCtrl', ['$scope', 'locker', '$location', '$routeParams', function ($scope, locker, $location, $routeParams) {

    //login check
    if (locker.get('token') === undefined) {
        $location.path('/lobby');
    }

    $scope.nickname = locker.get('nickname');
    $scope.gameid = $routeParams.gameid;

    $scope.game = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    $scope.move = function (i, j) {
        console.log(i + ':' + j);
        $scope.game[i][j] = 'X';
    }
}]);