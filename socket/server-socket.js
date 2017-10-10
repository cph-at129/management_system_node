var db = require('../db/db.js');
var query = require('../db/query.js');

var ServerSocket = function () {

    var self = this;
    self.socket = null;

    self.connect = function (io) {
        io.on('connection', function (socket) {
            console.log('user connected');

            socket.on('users request', function () {
                db.query('users', null, query.find, function (err, result) {
                    if (err) socket.emit('users response', {error: 'Something went wrong! Please try again'});
                    else {
                        console.log(result);
                        socket.emit('users response', {users: result});
                    }
                });
            });

            socket.on('actions request', function () {
                db.query('actions', null, query.find, function (err, result) {
                    if (err) socket.emit('actions response', {error: 'Something went wrong! Please try again'});
                    else {
                        socket.emit('actions response', {actions: result});
                    }
                });
            });

            socket.on('login request', function (user) {
                db.query('users', user, query.insert, function (err, result) {
                    if (err) {
                        console.log(err);
                        socket.emit('login response', {error: 'Something went wrong! Please try again'});
                    }
                    else {
                        socket.emit('login response', {user});
                        db.query('users', null, query.find, function (err, result) {
                            if (err) socket.emit('users response', {error: 'Something went wrong! Please try again'});
                            else {
                                io.emit('users response', {users: result});
                            }
                        });
                    }
                });
            });

            socket.on('new action request', function (actions) {
                db.query('actions', actions, query.insert, function (err, result) {
                    if (err) socket.emit('new action response', {error: 'Something went wrong! Please try again'});
                    else {
                        db.query('actions', null, query.find, function (err, result) {
                            if (err) socket.emit('new action response', {error: 'Something went wrong! Please try again'});
                            else {
                                io.emit('new action response', {actions: result});
                            }
                        });
                    }
                });
            });

            socket.on('client message', function (msg) {
                // io.emit('messages', {messages});
            });

            socket.on('disconnect', function () {
                console.log('user disconnected');
            });
        });
    };
};

module.exports = new ServerSocket();