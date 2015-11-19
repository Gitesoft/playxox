xox.controller('LoginCtrl', ['$scope', 'locker', '$location', 'api', function ($scope, locker, $location, api) {

    if (locker.get('token') !== undefined) {
        $location.path('/lobby');
    }

    $scope.nickname = "";
    $scope.errors = null;

    $scope.doLogin = function () {

        var success = function (response) {
            $scope.errors = null;
            api.me = response;
            locker.put('me', response);
            $location.path('/lobby');
        };

        var error = function (response) {
            $scope.errors = response;
        };

        var options = {
            'url': 'register',
            'data': {
                nickname: $scope.nickname
            }
        };
        api.post(options).success(success).error(error);
    };
}]);