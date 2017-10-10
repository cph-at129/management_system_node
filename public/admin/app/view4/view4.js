'use strict';

angular.module('myApp.view4', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view4', {
            templateUrl: 'view4/view4.html',
            controller: 'View4Ctrl'
        });
    }])

    .controller('View4Ctrl', ['$scope', 'DataService', function ($scope, DataService) {
        $scope.actions = [];

        DataService.getActions();

        DataService.subscribe(function (event, data) {
            switch (event) {
                case 'actions response success':
                    $scope.$apply(function () {
                        $scope.actions = data.actions;
                    });
                    break;
                case 'new action response success':
                    $scope.$apply(function () {
                        $scope.actions = data.actions;
                    });
                    break;
                default:
            }
        });
    }]);