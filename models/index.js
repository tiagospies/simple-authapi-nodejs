(function() {
  'use strict';

  var Sequelize = require("sequelize");
  var config = require('../config.json');

  var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    pool: {
      max: config.maxPoolSize,
      min: config.minPoolSize,
      idle: config.idlePool
    },
  });

  var models = [                 
  'user',       
  ];
  models.forEach(function(model) {
    module.exports[model] = sequelize.import(model);
  });

})();