'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .controller('View1Ctrl', ['$scope', 'DataService', function ($scope, DataService) {

        $scope.submitMessage = submitMessage;
        $scope.formatMessages = formatMessages;
        $scope.clientMessage = '';
        $scope.messages = [];
        $scope.users = [];
        $scope.userSelected = '';
        $scope.formattedMessages = '';

        DataService.subscribe()
            .then(function (obj) {
                switch (obj.event) {
                    case 'users response success':
                        console.log('users response');
                        $scope.users = obj.data.users;
                        break;
                    case 'new message':
                        $scope.messages.push(obj.data);
                        $scope.formatMessages();
                        break;
                    default:
                }
            })
            .catch(function (err) {
                console.error(err);
            });

        DataService.getUsers()
            .then(function (response) {
                $scope.users = response.data.users;
            })
            .catch(function (err) {
                console.error(err);
            });

        DataService.getAdminMessages()
            .then(function (response) {
                $scope.messages = response.data.messages;
                $scope.formatMessages();
            })
            .catch(function (err) {
                console.error(err);
            });

        function submitMessage(msg) {
            console.log($scope.userSelected);
            DataService.sendAction({
                date: new Date(),
                from: 'admin',
                type: 'message',
                message: {
                    type: 'message',
                    msg: msg
                },
                to: $scope.userSelected
            });
            $scope.clientMessage = '';
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