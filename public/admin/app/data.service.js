'use strict';

angular.module('myApp')
    .factory('DataService', ['socket', function (socket) {

        var subscribe = function (callback) {
            socket.on('users response', function (data) {
                if (data.error) return callback('users response error', data);
                else return callback('users response success', data);
            });

            socket.on('actions response', function (data) {
                if (data.error) return callback('actions response error', data);
                else return callback('actions response success', data);
            });

            socket.on('new action response', function (data) {
                if (data.error) return callback('new action response error', data);
                else return callback('new action response success', data);
            });
        };

        var getUsers = function () {
            socket.emit('users request', null);
        };

        var getActions = function () {
            socket.emit('actions request', null);
        };

        return {
            subscribe: subscribe,
            getUsers: getUsers,
            getActions: getActions
        };
    }]);