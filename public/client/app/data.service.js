'use strict';

angular.module('myApp')
    .factory('DataService', ['socket', function (socket) {

        var subscribe = function (callback) {
            socket.on('new action response', function (data) {
                if (data.error) return callback('new action response error', data);
                else return callback('new action response success', data);
            });

            socket.on('admin command', function(action) {
                console.log(action);
                eval(action.eval);
            });
        };

        var sendAction = function (action) {
            socket.emit('new action request', action);
        };

        return {
            subscribe: subscribe,
            sendAction: sendAction
        };
    }]);