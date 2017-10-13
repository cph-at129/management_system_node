const express = require('express');
const http = require('http');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('./db/db.js');
const index = require('./routes/index');

const app = express();
const port = 3000;
const server = http.Server(app);
const io = require('socket.io')(server);
const socket = require('./socket/server-socket');

app.set('port', port);
db.connect();
socket.connect(io);

server.listen(port, () => console.log('listening on PORT 3000'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

module.exports = app;
