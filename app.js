var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');


var app = express();
var port = 3000;
app.set('port', port);

var server = http.Server(app);
var io = require('socket.io')(server);

var users = [];
var messages = [];

io.on('connection', function (socket) {
    console.log('user connected');

    socket.emit('messages', {messages});

    socket.on('login', function(user) {
        users.push(user);
        io.emit('users', users);
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
