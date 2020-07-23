// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// // sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");

// Creates a "BeerReview" model that matches up with DB
module.exports = function(sequelize, DataTypes) {
    var BeerReview = sequelize.define("BeerReview", {
      review: DataTypes.STRING,
      rating: DataTypes.DECIMAL
      // userID: DataTypes.INTEGER,
      // breweryID: DataTypes.INTEGER
    });
    
    
    BeerReview.associate = function(models){
      // models will allow us to referoecne other models synced with databse 
      // ie we are going to referecne the BeerReviewmodel
      BeerReview.belongsTo(models.User, {
        // this will add a column called UserID
    
        foreignKey: {
          allowNull: false
        }
    
      })
    
      BeerReview.belongsTo(models.Brewery, {
        // this will add a column called BreweryID
    
        foreignKey: {
          allowNull: false
        }
    
      })
    
    
    }
    // Syncs with DB
    // BeerReview.sync();
    
    // Makes the BeerReview Model available for other files (will also create a table)
    return BeerReview;
    }
    