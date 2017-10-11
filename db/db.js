var config = require('./config');
var mongoose = require('mongoose');
var driver = require('./driver');

var DB = function () {
    var self = this;

    self.connect = function () {
        mongoose.connect(`mongodb://${config.user}:${config.password}@${config.host}`);
        mongoose.Promise = global.Promise;
        var db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));

        db.once('open', function () {
            console.log('Connected to MongoDB!');
        });
    };

    self.query = function (collection, data, type) {
        return driver[type](collection, data);
    }
};

module.exports = new DB();