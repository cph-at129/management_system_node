'use strict';

angular.module('myApp.nav', ['ngRoute'])

    .controller('NavCtrl', ['$scope', 'AuthService', function ($scope, AuthService) {
        $scope.user = AuthService.getCurrentUser();

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