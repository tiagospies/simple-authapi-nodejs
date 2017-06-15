(function () {
	'use strict';

	var express = require('express');
	var authService = require('../services/authService.js');

	var router = express.Router();

	router.post('/', function (req, res) {
		authService.setUserToken(req.body.email, req.body.password).then(function (returnKey) {
			res.json(returnKey);
		});
	});

	router.get('/getToken', function (req, res) {
		authService.getUserToken(req.query.email).then(function (returnKey) {
			res.json(returnKey);
		});
	});

	module.exports = router;

})();
