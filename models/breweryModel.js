// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// // sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");

// Creates a "Brewery" model that matches up with DB
module.exports = function(sequelize, DataTypes) {
var Brewery = sequelize.define("Brewery", {
  name: DataTypes.STRING,
  website: DataTypes.STRING,
  streetAddress: DataTypes.STRING,
  logo: DataTypes.STRING
});

// Brewery has many reviews
// utlize the .associate() method to create an association between them
Brewery.associate =function (models){
  // models will allow us to reference other models synced with this database
  // ie we are going to referecne the Review model
  Brewery.hasMany(models.Review, {} )


}

// Syncs with DB
// Brewery.sync();

// Makes the Brewery Model available for other files (will also create a table)
return Brewery;
}