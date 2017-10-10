'use strict';

angular.module('myApp.nav', ['ngRoute'])

    .controller('NavCtrl', ['$scope', '$interval', 'socket', function ($scope, $interval, socket) {
        $scope.isConnected = socket.connected;
        $interval(function () {
            $scope.isConnected = socket.connected;
        }, 3000);
    }])
    .directive('myNav', function () {
        return {
            templateUrl: 'nav/nav.html'
        };
    });