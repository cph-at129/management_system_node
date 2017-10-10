angular.module('myApp')

    .factory('socket', function () {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        var socket = io.connect('http://localhost:3000?user=' + user.user);
        socket.on('connect', function () {
            console.log('client socket connected');
        });
        return socket;

    });
