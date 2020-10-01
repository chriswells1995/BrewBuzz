// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// // sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");

// Creates a "Review" model that matches up with DB
module.exports = function(sequelize, DataTypes) {
    var ResetToken = sequelize.define("ResetToken", {
      email: DataTypes.STRING,
      token: DataTypes.STRING,
      expiration: DataTypes.INTEGER,
      used: DataTypes.INTEGER
    });

    return ResetToken;
    }
    