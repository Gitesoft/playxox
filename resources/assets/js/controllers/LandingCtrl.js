xox.controller('LandingCtrl', ['$scope', 'locker', '$location', function ($scope, locker, $location) {

    if (locker.get('token') !== undefined) {
        $location.path('/lobby');
    } else {
        $location.path('/login');
    }
}]);