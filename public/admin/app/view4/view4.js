'use strict';

angular.module('myApp.view4', ['ngRoute'])

    .controller('View4Ctrl', ['$scope', 'DataService', function ($scope, DataService) {
        $scope.actions = [];

        DataService.getActions()
            .then(function (response) {
                $scope.actions = response.data.actions;
            })
            .catch(function (err) {
                console.error(err);
            });

        DataService.subscribe()
            .then(function (obj) {
                switch (obj.event) {
                    case 'new action response success':
                        $scope.actions = obj.data.actions;
                        break;
                    default:
                }
            });
    }]);