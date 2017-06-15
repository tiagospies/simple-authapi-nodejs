(function () {
  "use strict";

  var q = require('q');
  var NodeCache = require("node-cache");
  var myCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
  var models = require('../models');
  var config = require('../config.json');

  module.exports = {
    setUserToken: function (email, password) {
      var deferred = q.defer();
      models.user.findAll({
        where: {
          Email: email,
          Password: password
        }
      }).then(function (users) {
        if (users.length > 0) {
          require('crypto').randomBytes(32, function (ex, buf) {
            var token = buf.toString('hex');
            myCache.set(email, token, config.timeUserCache);
            deferred.resolve({
              token: token,
              timeout: config.timeUserCache
            });
          });
        } else {
          deferred.resolve({ error: "1" }); //User not Exists.
        }
      });
      return deferred.promise;
    },

    getUserToken: function (email) {
      var deferred = q.defer();
      myCache.get(email, function (err, value) {
        if (!err) {
          if (value == undefined) {
            deferred.resolve({ error: "2" }); //Session Expired.
          } else {
            deferred.resolve({ token: value });
          }
        } else {
          deferred.resolve({ error: "3" }); //Error on use Session Memory.
        }
      });

      return deferred.promise;
    }

  }
})();