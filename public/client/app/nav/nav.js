'use strict';

angular.module('myApp.nav', ['ngRoute'])

    .controller('NavCtrl', ['$scope', 'AuthService', 'DataService', 'socket', '$interval', function ($scope, AuthService, DataService, socket, $interval) {
        $scope.user = AuthService.getCurrentUser();

        $scope.isConnected = socket.connected;
        $interval(function () {
            $scope.isConnected = socket.connected;
        }, 3000);

        DataService.subscribe(function (obj) {
            switch (obj.event) {
                case 'admin command':
                    console.log('admin command');
                    eval(obj.data.message.eval);
                    break;
                default:
            }
        });

        AuthService.subscribe(function (obj) {
            switch (obj.event) {
                case 'login response success':
                    $scope.user = AuthService.getCurrentUser();
                    break;
                default:
            }
        });
    }])
    .directive('myNav', function () {
        return {
            templateUrl: 'nav/nav.html'
        };
    });