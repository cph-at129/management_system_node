var db = require('../db/db.js');
var query = require('../db/query.js');

var ServerSocket = function () {

    var self = this;
    self.sockets = new Map();

    self.connect = function (io) {
        io.on('connection', function (socket) {
            console.log('user connected', socket.conn.id);

            socket.on('users request', function () {
                db.query('users', null, query.find)
                    .then(function (result) {
                        socket.emit('users response', {users: result});
                    })
                    .catch(function (err) {
                        socket.emit('users response', {error: 'Something went wrong! Please try again'});
                    });
            });

            socket.on('actions request', function () {
                db.query('actions', null, query.find)
                    .then(function (result) {
                        socket.emit('actions response', {actions: result});
                    })
                    .catch(function (err) {
                        socket.emit('actions response', {error: 'Something went wrong! Please try again'});
                    });
            });

            socket.on('login request', function (user) {
                db.query('users', {field: 'user', val: user.user}, query.find)
                    .then(function (result) {
                        self.sockets.set(user.user, socket.conn.id);
                        if (result.length > 0) {
                            socket.emit('login response', {user: result[0]});
                        } else {
                            db.query('users', user, query.insert)
                                .then(function (result) {
                                    socket.emit('login response', {user});
                                    db.query('users', null, query.find)
                                        .then(function (result) {
                                            io.emit('users response', {users: result});
                                        })
                                        .catch(function (err) {
                                            socket.emit('users response', {error: 'Something went wrong! Please try again'});
                                        });
                                })
                                .catch(function (err) {
                                    console.log(err);
                                    socket.emit('login response', {error: 'Something went wrong! Please try again'});
                                });
                        }
                    })
                    .catch(function (err) {
                        socket.emit('login response', {error: 'Something went wrong! Please try again'});
                    });
            });

            socket.on('new action request', function (action) {
                db.query('actions', action, query.insert)
                    .then(function (result) {
                        console.log(self.sockets.size);
                        if (action.type === 'command') {
                            //find the client socket and send it the cmd
                            console.log(self.sockets.get(action.to));
                            socket.to(self.sockets.get(action.to)).emit('admin command', action);
                        }
                        db.query('actions', null, query.find)
                            .then(function (result) {
                                io.emit('new action response', {actions: result});
                            })
                            .catch(function (err) {
                                socket.emit('new action response', {error: 'Something went wrong! Please try again'});
                            });
                    })
                    .catch(function (err) {
                        socket.emit('new action response', {error: 'Something went wrong! Please try again'});
                    });
            });

            socket.on('client message request', function (msg) {
                // io.emit('client message response', {messages});
            });

            socket.on('admin command request', function (msg) {

            });

            socket.on('disconnect', function () {
                console.log('user disconnected');
            });
        });
    };
};

module.exports = new ServerSocket();