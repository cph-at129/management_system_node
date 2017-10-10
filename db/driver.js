var Promise = require('promise');

var Driver = function () {
    var self = this;

    self.insert = function (collection, data, db) {
        var _collection = db.collection(collection);
        return new Promise(function (fulfill, reject) {
            _collection.insert(data, function (err, result) {
                if (err) reject(err);
                fulfill(result);
            });
        });
    };

    self.find = function (collection, data, db) {
        var _collection = db.collection(collection);
        if (!data) {
            return new Promise(function (fulfill, reject) {
                _collection.find({}).toArray(function (err, docs) {
                    if (err) reject(err);
                    fulfill(docs);
                });
            });
        } else {
            return new Promise(function (fulfill, reject) {
                _collection.find({[data.field]: data.val}).toArray(function (err, docs) {
                    if (err) reject(err);
                    fulfill(docs);
                });
            });
        }


    }
};

module.exports = new Driver();