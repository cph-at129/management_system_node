var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../db/db');
var query = require('../db/query');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views/index.html'))
});

router.get('/clientMessages/:user', function (req, res, next) {
    db.query('Action', {'to': req.params.user}, query.find)
        .then(function (result) {
            res.json({messages: result});
        })
        .catch(function (err) {
            res.json({err: 'Something went wrong!'})
        });
});

router.get('/adminMessages', function (req, res, next) {
    db.query('Action', {'to': 'admin'}, query.find)
        .then(function (result) {
            res.json({messages: result});
        })
        .catch(function (err) {
            res.json({err: 'Something went wrong!'})
        });
});

router.get('/users', function (req, res, next) {
    db.query('User', {}, query.find)
        .then(function (result) {
            res.json({users: result});
        })
        .catch(function (err) {
            res.json({err: 'Something went wrong!'})
        });
});

router.get('/clientActions/:user', function (req, res, next) {
    db.query('Action', {'to': req.params.user}, query.find)
        .then(function (result1) {
            db.query('Action', {'from': req.params.user}, query.find)
                .then(function (result2) {
                    res.json({actions: result1.concat(result2)});
                })
                .catch(function (err) {
                    res.json({err: 'Something went wrong!'})
                });

        })
        .catch(function (err) {
            res.json({err: 'Something went wrong!'})
        });
});

router.get('/actions', function (req, res, next) {
    db.query('Action', {}, query.find)
        .then(function (result) {
            res.json({actions: result});
        })
        .catch(function (err) {
            res.json({err: 'Something went wrong!'})
        });
});

module.exports = router;
