xox.controller('GameCtrl', ['$scope', 'locker', '$location', '$routeParams', function ($scope, locker, $location, $routeParams) {

    //login check
    if (locker.get('token') === undefined) {
        $location.path('/lobby');
    }

    $scope.nickname = locker.get('nickname');
    $scope.gameid = $routeParams.gameid;
    $scope.char = 'X';

    $scope.game = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    $scope.move = function (i, j) {
        if ($scope.game[i][j] === null) {
            $scope.game[i][j] = angular.copy($scope.char);
        }
    }
}]);