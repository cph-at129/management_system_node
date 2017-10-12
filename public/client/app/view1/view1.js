'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .controller('View1Ctrl', ['$scope', 'DataService', function ($scope, DataService) {
        $scope.testDate = new Date();
        $scope.actions = [];

        DataService.getActions()
            .then(function (response) {
                $scope.actions = response.data.actions;
                orderByDate();
            })
            .catch(function (err) {
                console.error(err);
            });

        function orderByDate() {
            $scope.actions.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
        }
    }]);