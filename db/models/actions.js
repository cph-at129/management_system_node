var mongoose  = require('mongoose');

var actionSchema = mongoose.Schema({
    date: Date,
    type: String,
    message: {},
    author: String,
    from: String,
    to: String
});

module.exports = mongoose.model('Action', actionSchema);