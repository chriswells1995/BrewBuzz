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


Review.associate = function(models){
  // models will allow us to referoecne other models synced with databse 
  // ie we are going to referecne the Reviewmodel
  Review.belongsTo(models.User, {
    // this will add a column called UserID

    foreignKey: {
      allowNull: false
    }

  })

  Review.belongsTo(models.Brewery, {
    // this will add a column called BreweryID

    foreignKey: {
      allowNull: false
    }

  })


}


// Syncs with DB
Review.sync();

// Makes the Review Model available for other files (will also create a table)
module.exports = Review;
