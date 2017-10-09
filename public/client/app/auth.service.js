'use strict';

angular.module('myApp')
    .factory('AuthService', ['socket', function (socket) {

        var subscribe = function (callback) {
            socket.on('login response', function (data) {
                if (data.error) return callback('login response error', data);
                else {
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                    return callback('login response success', data);
                }
            });
        };

        var getCurrentUser = function () {
            return JSON.parse(localStorage.getItem('currentUser'));
        };

        var login = function (user) {
            socket.emit('login request', user);
        };


        return {
            subscribe: subscribe,
            getCurrentUser: getCurrentUser,
            login: login
        };
    }]);