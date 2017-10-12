'use strict';

angular.module('myApp')
    .factory('DataService', ['socket', '$http', function (socket, $http) {

        var subscribe = function (callback) {

            socket.on('users response', function (data) {
                if (data.error) callback({event: 'users response error', data: data});
                else callback({event: 'users response success', data: data});
            });

            socket.on('actions response', function (data) {
                if (data.error) callback({event: 'actions response error', data: data});
                else callback({event: 'actions response success', data: data});
            });

            socket.on('new action response', function (data) {
                if (data.error) callback({event: 'new action response error', data: data});
                else callback({event: 'new action response success', data: data});
            });

            socket.on('admin messages response', function (data) {
                if (data.error) callback({event: 'admin messages response error', data: data});
                else callback({event: 'admin messages response success', data: data});
            });

            socket.on('new message', function (data) {
                callback({event: 'new message', data: data});
            });
        };

        var getUsers = function () {
            return $http.get('/users');
        };

        var getAdminMessages = function () {
            return $http.get('/adminMessages');
        };

        var sendAction = function (action) {
            socket.emit('new action request', action);
        };

        var getActions = function () {
            return $http.get('/actions');
        };

        return {
            subscribe: subscribe,
            getUsers: getUsers,
            sendAction: sendAction,
            getAdminMessages: getAdminMessages,
            getActions: getActions
        };
    }]);