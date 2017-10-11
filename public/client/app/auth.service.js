'use strict';

angular.module('myApp')
    .factory('AuthService', ['socket', '$q', function (socket, $q) {

        var subscribe = function (callback) {
            var deferred = $q.defer();
            socket.on('login response', function (data) {
                if (data.error) deferred.reject({event: 'login response error', data: data});
                else {
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                    deferred.resolve({event: 'login response success', data: data});
                }
            });
            return deferred.promise;
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