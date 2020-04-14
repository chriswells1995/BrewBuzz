// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Review" model that matches up with DB
var Review = sequelize.define("review", {
  review: Sequelize.STRING,
  userID: Sequelize.INTEGER,
  breweryID: Sequelize.INTEGER
});

// Syncs with DB
Review.sync();

// Makes the Review Model available for other files (will also create a table)
module.exports = Review;
