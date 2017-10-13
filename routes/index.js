const express = require('express');
const router = express.Router();
const path = require('path');
const actionsController = require('../controllers/actions-controller');
const usersController = require('../controllers/users-controller');

/* GET home page. */
router.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '../views/index.html')));

/* GET all client messages */
router.get('/clientMessages/:user', actionsController.getClientMessages);

/* GET all admin messages */
router.get('/adminMessages', actionsController.getAdminMessages);

/* GET all actions */
router.get('/actions', actionsController.getActions);

/* GET all users */
router.get('/users', usersController.getUsers);

/* GET all actions for a user */
router.get('/clientActions/:user', usersController.getUserActions);

module.exports = router;
