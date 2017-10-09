var config = require('./config');
var driver = require('./driver');
var query = require('./query');
var MongoClient = require('mongodb').MongoClient;

var DB = function () {
    var self = this;

    self.db = null;

    self.connect = function () {
        MongoClient.connect(`mongodb://${config.user}:${config.password}@${config.host}`)
            .then(function (db) {
                console.log('Connected to MongoDB');
                self.db = db;
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    self.query = function (collection, data, type, callback) {
        driver[type](collection, data, self.db, function (err, result) {
            if(err) return callback(err, null);
            return callback(null, result);
        });
    }
};

module.exports = new DB();