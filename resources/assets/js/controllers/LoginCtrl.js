xox.controller('LoginCtrl', ['$scope', 'locker', '$location', function ($scope, locker, $location) {

    $scope.nickname = "";

    if (locker.get('token') !== undefined) {
        $location.path('/lobby');
    }

    $scope.doLogin = function () {
        var success = function (response) {
            locker.put('token', response.token);
            locker.put('nickname', response.nickname);
            $location.path('/lobby');
        };

        success({
            nickname: $scope.nickname,
            token: 'asd214askdjla'
        });
    };


}]);