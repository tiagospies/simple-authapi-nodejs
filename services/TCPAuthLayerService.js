(function () {
	"use strict";

	var config = require('../config.json');
	var authService = require('../services/authService.js');
	var net = require('net');

	module.exports = {
		startServer: function () {
			net.createServer(function (sock) {
				sock.on('data', function (data) {
					console.log('Receive validate ' + sock.remoteAddress + ': ' + data);
					var jsonData = JSON.parse(data);
					authService.getUserToken(jsonData.user).then(function (returnKey) {
						var isValid = false;
						if(returnKey.token == jsonData.password){
							isValid = true;
						}
						sock.write(isValid.toString());
					});
				});

				sock.on('close', function (data) {
					console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
				});

			}).listen(config.portTCPServerAuth, config.AddressTCPServerAuth);

			console.log('Server listening on ' + config.AddressTCPServerAuth + ':' + config.portTCPServerAuth);
		}
	}
})();