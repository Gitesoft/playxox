xox.controller('LoginCtrl', ['$scope', 'locker', '$location', 'api', function ($scope, locker, $location, api) {

    if (locker.get('token') !== undefined) {
        $location.path('/lobby');
    }

    $scope.nickname = "";

    $scope.doLogin = function () {

        var success = function (response) {
            api.me = response;
            locker.put('me', response);
            $location.path('/lobby');
        };

        success({
            "id": Math.random() % 100,
            "nickname": "aozisik",
            "country": "United States",
            "ip_address": "127.0.0.0",
            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdFwvYXBpXC9yZWdpc3RlciIsImlhdCI6IjE0NDc5MzQ2OTkiLCJleHAiOiIxNDQ3OTM4Mjk5IiwibmJmIjoiMTQ0NzkzNDY5OSIsImp0aSI6IjI5ZTcwYjczNDI4MjM3ZTk0MWQzNjg2ODI3NGRhMzFiIn0.iT9VsNdo7w8kl2eyIewKTtGihT303wMOY-PdxYj81aI",
            "created_at": "2015-11-19 12:04:59",
            "updated_at": "2015-11-19 12:04:59"
        });
    };


}]);