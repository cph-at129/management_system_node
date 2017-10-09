var Driver = function () {
    var self = this;

    self.insert = function (collection, data, db, callback) {
        var _collection = db.collection(collection);
        _collection.insert(data, function (err, result) {
            if(err) return callback(err, null);
            return callback(null, result);
        });
    }

    self.find = function(collection, data, db, callback) {
        var _collection = db.collection(collection);
        _collection.find({}).toArray(function(err, docs) {
            if(err) return callback(err, null);
            return callback(null, docs);
        });
    }
};

module.exports = new Driver();