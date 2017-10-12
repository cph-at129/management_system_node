'use strict';

angular.module('myApp.view3', ['ngRoute'])

    .controller('View3Ctrl', ['$scope', '$timeout', 'DataService', 'AuthService', function ($scope, $timeout, DataService, AuthService) {
        $scope.statistics = {};
        $scope.sendStatistics = sendStatistics;
        $scope.statisticsMessage = '';
        $scope.user = AuthService.getCurrentUser();

        AuthService.subscribe(function (obj) {
            switch (obj.event) {
                case 'login response success':
                    $scope.user = obj.data.user;
                    break;
            }
        });


        DataService.subscribe(function (obj) {
            switch (obj.event) {
                case 'new action response error':
                    console.error('Something went wrong!');
                    break;
                case 'new action response success':
                    console.log(obj.data);
                    break;
                default:
            }
        });

        function sendStatistics(field) {
            $scope.statisticsMessage = 'Sending statistics for field [ ' + field + ' ]';
            $timeout(function () {
                $scope.statisticsMessage = '';
            }, 3000);

            var action = '';
            switch (field) {
                case 'selectOption':
                    action = 'selected option ' + $scope.statistics[field];
                    break;
                case 'color':
                    action = 'picked color ' + $scope.statistics[field];
                    break;
                case 'radio1':
                    action = 'selected radio 1';
                    break;
                case 'radio2':
                    action = 'selected radio 2';
                    break;
                case 'inputText':
                    action = 'typed in input text "' + $scope.statistics[field] + '"';
                    break;
                case 'inputNumber':
                    action = 'typed in input number "' + $scope.statistics[field] + '"';
                    break;
                case 'checkbox1':
                    action = 'checked checkbox NodeJS';
                    break;
                case 'checkbox2':
                    action = 'checked checkbox AngularJS';
                    break;
                default: {
                }
            }

            var statisticsObj = {
                date: new Date(),
                type: 'statistics',
                message: {
                    type: 'event',
                    action: action
                },
                from: $scope.user
            };

            console.log(statisticsObj);

            DataService.sendAction(statisticsObj);
        }
    }]);