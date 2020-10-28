const express = require('express');
const api = express.Router();
const testController = require('../controllers/test.controller');

api.get('/test/publicPing', testController.publicPing);
api.get('/test/privatePing', testController.privatePing);

module.exports = api;