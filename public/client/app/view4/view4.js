'use strict';

angular.module('myApp.view4', ['ngRoute'])

    .controller('View4Ctrl', ['$scope', 'socket', 'AuthService', function ($scope, socket, AuthService) {
        $scope.login = login;
        $scope.invalidFormError = '';
        $scope.serverError = '';
        $scope.successLogin = '';
        $scope.user = JSON.parse(localStorage.getItem('currentUser'));

        AuthService.subscribe(function (obj) {
            switch (obj.event) {
                case 'login response error':
                    $scope.serverError = obj.data.error;
                    $scope.user = JSON.parse(localStorage.getItem('currentUser')) || {};
                    break;
                case 'login response success':
                    $scope.successLogin = 'Successfully logged in!';
                    $scope.user = obj.data.user;
                    break;
                default:
            }
        });

        function login(obj) {
            $scope.invalidFormError = '';
            $scope.serverError = '';
            $scope.successLogin = '';
            $scope.user = {};
            if (!obj || !obj.user || !obj.email) {
                $scope.invalidFormError = 'Please fill in all the fields!';
            } else {
                $scope.invalidFormError = '';
                AuthService.login({
                    user: obj.user,
                    email: obj.email,
                    created: new Date(),
                    last_visit: new Date(),
                    last_action: new Date()
                });
            }
        }

    }]);