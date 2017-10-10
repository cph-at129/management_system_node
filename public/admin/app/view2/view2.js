'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope', 'DataService', function ($scope, DataService) {
        $scope.sendCommand = sendCommand;
        $scope.command = '';
        $scope.users = [];
        $scope.userSelected = '';

        DataService.subscribe(function (event, data) {
            switch (event) {
                case 'users response success':
                    $scope.$apply(function () {
                        $scope.users = data.users;
                    });
                    break;
                default:
            }
        });

        DataService.getUsers();

        function sendCommand(cmd) {
            DataService.sendCommand({
                date: new Date(),
                type: 'command',
                message: {
                    eval: cmd
                },
                author: 'Admin',
                to: $scope.userSelected
            });
        }
    }]);