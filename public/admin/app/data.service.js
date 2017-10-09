'use strict';

angular.module('myApp')
    .factory('DataService', ['socket', function (socket) {

        var subscribe = function (callback) {
            socket.on('users response', function (data) {
                if (data.error) return callback('users response error', data);
                else return callback('users response success', data);
            });
        };

        var getUsers = function () {
            socket.emit('users request', null);
        };

        return {
            subscribe: subscribe,
            getUsers: getUsers
        };
    }]);