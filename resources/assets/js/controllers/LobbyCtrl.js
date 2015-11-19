xox.controller('LobbyCtrl', ['$scope', 'locker', '$location', function ($scope, locker, $location) {

    $scope.doLogout = function () {
        //wipe local storage
        locker.pull('token');
        locker.pull('nickname');

        //redirect to home
        $location.path('');
    }
}]);