var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./db/db.js');
var index = require('./routes/index');


var app = express();
var port = 3000;
app.set('port', port);

var server = http.Server(app);
var io = require('socket.io')(server);
var socket = require('./socket/server-socket');

db.connect();
socket.connect(io);

server.listen(port, function () {
    console.log('listening on PORT 3000');
});

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);


module.exports = app;
