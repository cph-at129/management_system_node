'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope', 'socket', function ($scope, socket) {

        $scope.isAdminMessage = isAdminMessage;
        $scope.submitMessage = submitMessage;
        $scope.clientMessage = '';
        $scope.user = JSON.parse(localStorage.getItem('currentUser')) || {username: 'test', email: 'test@gmail.com'};
        $scope.messages = [];

        socket.on('messages', function (data) {
            $scope.$apply(function () {
                $scope.messages = data.messages;
            });
        });

        function submitMessage(msg) {
            socket.emit('client message', {
                from: $scope.user.username,
                text: msg
            });
            $scope.clientMessage = '';
        }

        function isAdminMessage(from) {
            return from === 'Admin';
        }
    }]);