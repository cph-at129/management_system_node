'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .controller('View1Ctrl', ['$scope', 'DataService', function ($scope, DataService) {
        $scope.testDate = new Date();
        $scope.actions = [];

        DataService.getActions()
            .then(function (response) {
                $scope.actions = response.data.actions;
            })
            .catch(function (err) {
                console.error(err);
            });
    }]);