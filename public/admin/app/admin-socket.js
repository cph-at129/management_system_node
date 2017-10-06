angular.module('myApp')

    .factory('socket', function () {
        var socket = io.connect('http://localhost:3000');
        socket.on('connect', function () {
            console.log('admin socket connected');
        });
        return socket;

    });
