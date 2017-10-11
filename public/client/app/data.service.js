'use strict';

angular.module('myApp')
    .factory('DataService', ['socket', 'AuthService', '$http', '$q', function (socket, AuthService, $http, $q) {

        var subscribe = function (callback) {

            var deferred = $q.defer();

            socket.on('new action response', function (data) {
                if (data.error) deferred.reject({event: 'new action response error', data: data});
                else deferred.resolve({event: 'new action response success', data: data});
            });

            socket.on('admin command', function (action) {
                deferred.resolve({event: 'admin command', action: action});
            });

            socket.on('client messages response', function (data) {
                if (data.error) deferred.reject({event: 'client messages response error', data: data});
                else deferred.resolve({event: 'client messages response success', data: data});
            });

            socket.on('new message', function (data) {
                deferred.resolve({event: 'new message', data: data});
            });

            return deferred.promise;
        };

        var getClientMessages = function () {
            return $http.get('/clientMessages/' + AuthService.getCurrentUser().user);
        };

        var getActions = function () {
            return $http.get('/clientActions/' + AuthService.getCurrentUser().user);
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