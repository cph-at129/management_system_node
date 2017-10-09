'use strict';

angular.module('myApp.view3', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', ['$scope', 'DataService', function ($scope, DataService) {
        $scope.testDate = new Date();
        $scope.users = [];

        DataService.subscribe(function(event, data) {
            switch (event) {
                case 'users response error': {
                    $scope.serverError = data.error;
                }
                    break;
                case 'users response success': {
                    $scope.$apply(function () {
                        $scope.users = data.users;
                    });
                }
                    break;
                default: {
                }
            }
        });

        DataService.getUsers();
    }]);