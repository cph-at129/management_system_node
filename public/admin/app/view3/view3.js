'use strict';

angular.module('myApp.view3', ['ngRoute'])

    .controller('View3Ctrl', ['$scope', 'DataService', function ($scope, DataService) {
        $scope.users = [];

        DataService.getUsers()
            .then(function (response) {
                $scope.users = response.data.users;
            })
            .catch(function (err) {
                console.error(err);
            });
    }]);