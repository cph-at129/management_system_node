const db = require('../db/db');
const query = require('../db/query');

class UsersController {
    getUserActions(req, res, next) {
        db.query('Action', {'to': req.params.user}, query.find)
            .then((result1) => {
                db.query('Action', {'from': req.params.user}, query.find)
                    .then((result2) => res.json({actions: result1.concat(result2)}))
                    .catch(() => this._errorHandler());
            }).catch(() => this._errorHandler());
    };

    getUsers(req, res, next) {
        db.query('User', {}, query.find)
            .then((result) => res.json({users: result}))
            .catch(() => this._errorHandler());
    };

    _errorHandler(err) {
        console.log(err);
    }
}

module.exports = new UsersController();