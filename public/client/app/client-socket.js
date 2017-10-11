angular.module('myApp')

    .factory('socket', function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var user = currentUser ? currentUser.user : null;
        var socket = io.connect('http://localhost:3000?user=' + user);
        socket.on('connect', function () {
            console.log('client socket connected');
        });
        return socket;

    });
