'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .controller('View2Ctrl', ['$scope', 'DataService', function ($scope, DataService) {
        $scope.sendCommand = sendCommand;
        $scope.command = '';
        $scope.users = [];
        $scope.userSelected = '';

        DataService.subscribe(function (obj) {
            switch (obj.event) {
                case 'users response success':
                    $scope.users = obj.data.users;
                    break;
                default:
            }
        });

        DataService.getUsers()
            .then(function (response) {
                $scope.users = response.data.users;
            })
            .catch(function (err) {
                console.error(err);
            });

        function sendCommand(cmd) {
            DataService.sendAction({
                date: new Date(),
                type: 'command',
                message: {
                    type: 'command',
                    eval: cmd
                },
                from: 'admin',
                to: $scope.userSelected
            });
        }
    }]);