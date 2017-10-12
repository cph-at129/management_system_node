'use strict';

angular.module('myApp')
    .factory('DataService', ['socket', 'AuthService', '$http', function (socket, AuthService, $http) {

        var subscribe = function (callback) {

            socket.on('new action response', function (data) {
                if (data.error) callback({event: 'new action response error', data: data});
                else callback({event: 'new action response success', data: data});
            });

            socket.on('admin command', function (data) {
                callback({event: 'admin command', data: data});
            });

            socket.on('client messages response', function (data) {
                if (data.error) callback({event: 'client messages response error', data: data});
                else callback({event: 'client messages response success', data: data});
            });

            socket.on('new message', function (data) {
                callback({event: 'new message', data: data});
            });
        };

        var getClientMessages = function () {
            return $http.get('/clientMessages/' + AuthService.getCurrentUser());
        };

        var getActions = function () {
            return $http.get('/clientActions/' + AuthService.getCurrentUser());
        };

        var sendAction = function (action) {
            socket.emit('new action request', action);
        };

        return {
            subscribe: subscribe,
            sendAction: sendAction,
            getClientMessages: getClientMessages,
            getActions: getActions
        };
    }]);