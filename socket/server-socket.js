const db = require('../db/db.js');
const query = require('../db/query.js');

class ServerSocket {

    constructor() {
        this.sockets = new Map();
    }

    connect(io) {
        io.on('connection', (socket) => {
            if (socket.handshake.query.admin) {
                this.sockets.set(socket.handshake.query.admin, socket.conn.id);
            } else if (socket.handshake.query.user) {
                let user = socket.handshake.query.user;
                this.sockets.set(user, socket.conn.id);
                this._updateUserLastVisit(user);
            }

            socket.on('login request', (user) => {
                db.query('User', {'user': user.user}, query.find)
                    .then((result) => {
                        this.sockets.forEach((val, key) => {
                            if (val === socket.conn.id) this.sockets.delete(key);
                        });
                        this.sockets.set(user.user, socket.conn.id);
                        if (result.length > 0) socket.emit('login response', {user: result[0]});
                        else {
                            db.query('User', user, query.insert)
                                .then((result) => {
                                    socket.emit('login response', {user});
                                    db.query('User', {}, query.find)
                                        .then((result) => socket.to(this.sockets.get('admin')).emit('users response', {users: result}))
                                        .catch((err) => socket.emit('users response', {error: 'Something went wrong! Please try again'}));
                                }).catch((err) => socket.emit('login response', {error: 'Something went wrong! Please try again'}));
                        }
                    }).catch((err) => socket.emit('login response', {error: 'Something went wrong! Please try again'}));
            });

            socket.on('new action request', (action) => {
                db.query('Action', action, query.insert)
                    .then((result) => {
                        switch (action.type) {
                            case 'command':
                                socket.to(this.sockets.get(action.to)).emit('admin command', action);
                                this._updateUserLastActionDate(action.to);
                                break;
                            case 'message':
                                console.log('NEW MESSAGE!');
                                socket.to(this.sockets.get(action.to)).emit('new message', action);
                                socket.emit('new message', action);
                                this._updateUserLastActionDate(action.from);
                                break;
                            case 'statistics':
                                this._updateUserLastActionDate(action.from);
                                break;
                            default:
                        }
                        db.query('Action', {}, query.find)
                            .then((result) => io.emit('new action response', {actions: result}))
                            .catch((err) => socket.emit('new action response', {error: 'Something went wrong! Please try again'}));
                    }).catch((err) => socket.emit('new action response', {error: 'Something went wrong! Please try again'}));
            });
            socket.on('disconnect', () => console.log('user disconnected'));
        });
    };

    _updateUserLastActionDate(user) {
        db.query('User', {'user': user}, query.find)
            .then((result) => {
                if (result.length > 0) {
                    let updatedUser = result[0];
                    updatedUser.last_action = new Date();
                    updatedUser.save((err, result) => {
                        if (err) console.log(err);
                    });
                }
            }).catch((err) => console.error(err));
    }

    _updateUserLastVisit(user) {
        db.query('User', {'user': user}, query.find)
            .then((result) => {
                if (result.length > 0) {
                    let updatedUser = result[0];
                    updatedUser.last_visit = new Date();
                    updatedUser.save((err, result) => {
                        if (err) console.log(err);
                    });
                }
            }).catch((err) => console.error(err));
    }
}

module.exports = new ServerSocket();