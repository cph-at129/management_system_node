var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./db/db.js');
var query = require('./db/query.js');
var index = require('./routes/index');


var app = express();
var port = 3000;
app.set('port', port);

var server = http.Server(app);
var io = require('socket.io')(server);

//db
db.connect();

var users = [];
var messages = [];

io.on('connection', function (socket) {
    console.log('user connected');

    socket.emit('messages', {messages});

    socket.on('users request', function () {
        db.query('users', null, query.find, function (err, result) {
            if (err) socket.emit('users response', {error: 'Something went wrong! Please try again'});
            else {
                console.log(result);
                socket.emit('users response', {users: result});
            }
        });
    });

    socket.on('login request', function (user) {
        console.log(user);
        db.query('users', user, query.insert, function (err, result) {
            if (err) {
                console.log(err);
                socket.emit('login response', {error: 'Something went wrong! Please try again'});
            }
            else {
                console.log(result);
                socket.emit('login response', {user});
                db.query('users', null, query.find, function (err, result) {
                    if (err) socket.emit('users response', {error: 'Something went wrong! Please try again'});
                    else {
                        console.log(result);
                        io.emit('users response', {users: result});
                    }
                });
            }
        });

    });

    socket.on('client message', function (msg) {
        messages.push(msg);
        io.emit('messages', {messages});
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

server.listen(port, function () {
    console.log('listening on PORT 3000');
});

// view engine setup
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);


module.exports = app;
