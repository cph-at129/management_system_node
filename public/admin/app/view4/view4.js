'use strict';

angular.module('myApp.view4', ['ngRoute'])

    .controller('View4Ctrl', ['$scope', 'DataService', function ($scope, DataService) {
        $scope.actions = [];

        DataService.getActions()
            .then(function (response) {
                $scope.actions = response.data.actions;
                orderByDate();
            })
            .catch(function (err) {
                console.error(err);
            });

        DataService.subscribe(function (obj) {
            switch (obj.event) {
                case 'new action response success':
                    $scope.actions = obj.data.actions;
                    orderByDate();
                    break;
                default:
            }
        });

        function orderByDate() {
            $scope.actions.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
        }
    }]);