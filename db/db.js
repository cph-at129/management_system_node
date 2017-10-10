var config = require('./config');
var driver = require('./driver');
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

    self.query = function (collection, data, type) {
        return driver[type](collection, data, self.db);
    }
};

module.exports = new DB();