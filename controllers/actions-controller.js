const db = require('../db/db');
const query = require('../db/query');

class ActionsController {

    getActions(req, res, next) {
        db.query('Action', {}, query.find)
            .then((result) => res.json({actions: result}))
            .catch(() => this._errorHandler());
    }

    getAdminMessages(req, res, next) {
        db.query('Action', {'to': 'admin', 'type': 'message'}, query.find)
            .then((result1) => {
                db.query('Action', {'from': 'admin', 'type': 'message'}, query.find)
                    .then((result2) => res.json({messages: result1.concat(result2)}))
                    .catch(() => this._errorHandler());
            }).catch(() => this._errorHandler());
    }

    getClientMessages(req, res, next) {
        db.query('Action', {'to': req.params.user, 'type': 'message'}, query.find)
            .then((result1) => {
                db.query('Action', {'from': req.params.user, 'type': 'message'}, query.find)
                    .then((result2) => res.json({messages: result1.concat(result2)}))
                    .catch(() => this._errorHandler());
            }).catch(() => this._errorHandler());
    }

    _errorHandler(err) {
        console.log(err);
    }
}

module.exports = new ActionsController();