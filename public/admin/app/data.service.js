'use strict';

angular.module('myApp')
    .factory('DataService', ['socket', '$http', '$q', function (socket, $http, $q) {

        var subscribe = function () {
            var deferred = $q.defer();

            socket.on('users response', function (data) {
                if (data.error) deferred.reject({event: 'users response error', data: data});
                else deferred.resolve({event: 'users response success', data: data});
            });

            socket.on('actions response', function (data) {
                if (data.error) deferred.reject({event: 'actions response error', data: data});
                else deferred.resolve({event: 'actions response success', data: data});
            });

            socket.on('new action response', function (data) {
                if (data.error) deferred.reject({event: 'new action response error', data: data});
                else return deferred.resolve({event: 'new action response success', data: data});
            });

            socket.on('admin messages response', function (data) {
                if (data.error) deferred.reject({event: 'admin messages response error', data: data});
                else return deferred.resolve({event: 'admin messages response success', data: data});
            });

            socket.on('new message', function (data) {
                return deferred.resolve({event: 'new message', data: data});
            });

            return deferred.promise;
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