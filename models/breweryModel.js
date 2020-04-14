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

// Syncs with DB
Brewery.sync();

// Makes the Brewery Model available for other files (will also create a table)
module.exports = Brewery;
