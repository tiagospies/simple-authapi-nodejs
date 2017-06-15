(function() {
	"use strict";

	var config = require('./config.json');
	var port = process.env.port || config.defaultPort;

	var express = require('express');
	var bodyParser = require('body-parser');
	var tcpAuthServer = require('./services/TCPAuthLayerService.js');

	var authRoute = require('./routes/auth');

	var server = express();

	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({ extended: true }));

	server.all('*', function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
		res.header('Cache-Control', 'no-cache');
		next();
	});

	server.use(express.static('public'));

	server.use('/auth', authRoute);

	server.listen(port);
	
	tcpAuthServer.startServer();

	console.log("----------------------------------------------------------------");
	console.log(`Running Auth service on port ${config.defaultPort}`);
	console.log("----------------------------------------------------------------");

	module.exports = server;

})();
