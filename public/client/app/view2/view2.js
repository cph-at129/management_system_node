'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .controller('View2Ctrl', ['$scope', 'DataService', 'AuthService', '$filter', function ($scope, DataService, AuthService, $filter) {

        $scope.submitMessage = submitMessage;
        $scope.formatMessages = formatMessages;
        $scope.currentUser = AuthService.getCurrentUser();
        $scope.adminMessage = '';
        $scope.messages = [];
        $scope.formattedMessages = '';

        DataService.subscribe(function (obj) {
            switch (obj.event) {
                case 'client messages response success':
                    $scope.messages = obj.data.messages;
                    $scope.formatMessages();
                    break;
                case 'new message':
                    $scope.messages.push(obj.data);
                    $scope.formatMessages();
                    break;
                default:
            }
        });

        DataService.getClientMessages()
            .then(function (response) {
                $scope.messages = response.data.messages;
                $scope.formatMessages();
            })
            .catch(function (err) {
                console.error(err);
            });

        function submitMessage(msg) {
            DataService.sendAction({
                date: new Date(),
                from: $scope.currentUser,
                type: 'message',
                message: {
                    type: 'message',
                    msg: msg
                },
                to: 'admin'
            });
            $scope.adminMessage = '';
        }

        function formatMessages() {
            $scope.formattedMessages = '';
            $scope.messages.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });

            var formattedArr = $scope.messages.map(function (obj) {
                return " \n " + $filter('date')(obj.date, 'shortTime') + " " + obj.from + " > " + obj.message.msg
            });
            formattedArr.forEach(function (message) {
                $scope.formattedMessages += message;
            });
        }
    }]);