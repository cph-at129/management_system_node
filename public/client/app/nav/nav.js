'use strict';

angular.module('myApp.nav', ['ngRoute'])

    .controller('NavCtrl', ['$scope', 'AuthService', 'socket', '$interval', function ($scope, AuthService, socket, $interval) {
        $scope.user = AuthService.getCurrentUser();

        $scope.isConnected = socket.connected;
        $interval(function () {
            $scope.isConnected = socket.connected;
        }, 3000);

        AuthService.subscribe(function (event, data) {
            if (event === 'login response success') {
                $scope.$apply(function () {
                    $scope.user = AuthService.getCurrentUser();
                });
            }
        });
    }])
    .directive('myNav', function () {
        return {
            templateUrl: 'nav/nav.html'
        };
    });