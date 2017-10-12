var db = require('../db/db.js');
var query = require('../db/query.js');

var ServerSocket = function () {

    var self = this;
    self.sockets = new Map();

    self.connect = function (io) {
        io.on('connection', function (socket) {
            console.log('user connected', socket.conn.id);

            if (socket.handshake.query.admin) {
                self.sockets.set(socket.handshake.query.admin, socket.conn.id);
                console.log('admin');
            } else if (socket.handshake.query.user) {
                var user = socket.handshake.query.user;
                self.sockets.set(user, socket.conn.id);
                console.log('user', user);
                updateUserLastVisit(user);
            }


            socket.on('login request', function (user) {
                db.query('User', {'user': user.user}, query.find)
                    .then(function (result) {
                        self.sockets.forEach(function (val, key) {
                            if (val === socket.conn.id) {
                                self.sockets.delete(key);
                            }
                        });
                        self.sockets.set(user.user, socket.conn.id);
                        if (result.length > 0) {
                            socket.emit('login response', {user: result[0]});
                        } else {
                            db.query('User', user, query.insert)
                                .then(function (result) {
                                    socket.emit('login response', {user});
                                    db.query('User', {}, query.find)
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
                db.query('Action', action, query.insert)
                    .then(function (result) {
                        switch (action.type) {
                            case 'command':
                                socket.to(self.sockets.get(action.to)).emit('admin command', action);
                                updateUserLastActionDate(action.to);
                                break;
                            case 'message':
                                console.log('NEW MESSAGE!');
                                socket.to(self.sockets.get(action.to)).emit('new message', action);
                                socket.emit('new message', action);
                                updateUserLastActionDate(action.from);
                                break;
                            case 'statistics':
                                updateUserLastActionDate(action.from);
                                break;
                            default:
                        }
                        db.query('Action', {}, query.find)
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

            socket.on('disconnect', function () {
                console.log('user disconnected');
            });
        });
    };

    function updateUserLastActionDate(user) {
        db.query('User', {'user': user}, query.find)
            .then(function (result) {
                if (result.length > 0) {
                    var updatedUser = result[0];
                    updatedUser.last_action = new Date();
                    updatedUser.save(function (err, result) {
                        if (err) console.log(err);
                        console.log(result);
                    });
                }
            })
            .catch(function (err) {
                console.error(err);
            });
    }

    function updateUserLastVisit(user) {
        db.query('User', {'user': user}, query.find)
            .then(function (result) {
                if (result.length > 0) {
                    var updatedUser = result[0];
                    updatedUser.last_visit = new Date();
                    updatedUser.save(function (err, result) {
                        if (err) console.log(err);
                        console.log(result);
                    });
                }
            })
            .catch(function (err) {
                console.error(err);
            });
    }
};

module.exports = new ServerSocket();