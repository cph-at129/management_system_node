var Promise = require('promise');

var Models = new Map();
Models.set('User', require('./models/users'));
Models.set('Action', require('./models/actions'));

var Driver = function () {
    var self = this;

    self.insert = function (collection, query) {
        var Model = Models.get(collection);
        var newRecord = new Model(query);
        return new Promise(function (fulfill, reject) {
            newRecord.save(function (err, result) {
                if (err) reject(err);
                Model.find(function (err, result) {
                    fulfill(result);
                });
            });
        });
    };

    self.find = function (collection, query) {
        var Model = Models.get(collection);
        return new Promise(function (fulfill, reject) {
            Model.find(query, function (err, docs) {
                if (err) reject(err);
                fulfill(docs);
            });
        });

    }
};

module.exports = new Driver();