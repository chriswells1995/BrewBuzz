// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Brewery" model that matches up with DB
var Brewery = sequelize.define("brewery", {
  name: Sequelize.STRING,
  website: Sequelize.INTEGER,
  streetAdress: Sequelize.INTEGER
});

// Brewery has many reviews
// utlize the .associate() method to create an association between them
Brewery.associate =function (models){
  // models will allow us to reference other models synced with this database
  // ie we are going to referecne the Review model
  Brewery.hasMany(models.Review, {} )


}

// Syncs with DB
Brewery.sync();

// Makes the Brewery Model available for other files (will also create a table)
module.exports = Brewery;
