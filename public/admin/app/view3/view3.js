'use strict';

angular.module('myApp.view3', ['ngRoute'])

    .controller('View3Ctrl', ['$scope', 'DataService', function ($scope, DataService) {
        $scope.users = [];

        DataService.getUsers()
            .then(function (response) {
                $scope.users = response.data.users;
                orderByDate();
            })
            .catch(function (err) {
                console.error(err);
            });

        function orderByDate() {
            $scope.users.sort(function (a, b) {
                return new Date(b.created) - new Date(a.created);
            });
        }
    }]);