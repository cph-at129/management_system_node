'use strict';

angular.module('myApp')
    .factory('AuthService', ['socket', '$location', function (socket, $location) {

        var subscribe = function (callback) {
            socket.on('login response', function (data) {
                if (data.error) callback({event: 'login response error', data: data});
                else {
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                    callback({event: 'login response success', data: data});
                }
            });
        };

        var getCurrentUser = function () {
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) {
                $location.url('view4');
                return 'unknown';
            }
            else {
                return currentUser.user;
            }
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