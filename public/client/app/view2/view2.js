'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope', 'socket', 'AuthService', function ($scope, socket, AuthService) {

        $scope.isAdminMessage = isAdminMessage;
        $scope.submitMessage = submitMessage;
        $scope.clientMessage = '';
        $scope.user = AuthService.getCurrentUser();
        $scope.messages = [];

        socket.on('messages', function (data) {
            $scope.$apply(function () {
                $scope.messages = data.messages;
            });
        });

        function submitMessage(msg) {
            var obj = {
                date: new Date(),
                type: 'message',
                author: $scope.user,
                message: msg
            };
            console.log('emitting message', obj);
            socket.emit('client message', obj);
            $scope.clientMessage = '';
        }

        function isAdminMessage(from) {
            return from === 'Admin';
        }
    }]);