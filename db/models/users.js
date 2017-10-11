var mongoose  = require('mongoose');

var userSchema = mongoose.Schema({
    user: String,
    email: String,
    created: Date,
    last_visit: Date,
    last_action: Date
});

module.exports = mongoose.model('User', userSchema);