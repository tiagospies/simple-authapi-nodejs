(function() {
  "use strict";

  module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define("security.User", {
      Id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      Name: {
        type: DataTypes.STRING
      },
      Email: {
        type: DataTypes.STRING
      },
      Password: {
        type: DataTypes.STRING
      },
      Role: {
        type: DataTypes.INTEGER
      }
    }, {
      timestamps: false
    });
    return user;

  };
})();