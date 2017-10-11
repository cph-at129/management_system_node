'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .controller('View2Ctrl', ['$scope', 'DataService', 'AuthService', function ($scope, DataService, AuthService) {

        $scope.submitMessage = submitMessage;
        $scope.formatMessages = formatMessages;
        $scope.currentUser = AuthService.getCurrentUser().user;
        $scope.adminMessage = '';
        $scope.messages = [];
        $scope.formattedMessages = '';

        DataService.subscribe()
            .then(function (obj) {
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
            var formattedArr = $scope.messages.map(function (obj) {
                return " \n " + obj.from + " > " + obj.message.msg
            });
            formattedArr.forEach(function (message) {
                $scope.formattedMessages += message;
            });
        }
    }]);