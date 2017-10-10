'use strict';

angular.module('myApp.nav', ['ngRoute'])

    .controller('NavCtrl', ['$scope', 'AuthService', 'DataService', 'socket', '$interval', function ($scope, AuthService, DataService, socket, $interval) {
        $scope.user = AuthService.getCurrentUser();

        $scope.isConnected = socket.connected;
        $interval(function () {
            $scope.isConnected = socket.connected;
        }, 3000);

        DataService.subscribe(function(event, data) {
            switch(event) {
                case 'admin command':
                    eval(data.message.eval);
                    break;
                default:
            }
        });

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