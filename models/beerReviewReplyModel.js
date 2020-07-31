// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// // sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");

// Creates a "BeerReviewReply" model that matches up with DB
module.exports = function(sequelize, DataTypes) {
    var BeerReviewReply = sequelize.define("BeerReviewReply", {
      reply: DataTypes.STRING,
      like: DataTypes.STRING
      // userID: DataTypes.INTEGER,
      // breweryID: DataTypes.INTEGER
    });
    
    
    BeerReviewReply.associate = function(models){
      // models will allow us to referoecne other models synced with databse 
      // ie we are going to referecne the BeerReviewReplymodel
      BeerReviewReply.belongsTo(models.User, {
        // this will add a column called UserID
    
        foreignKey: {
          allowNull: false
        }
    
      })
    
      BeerReviewReply.belongsTo(models.BeerReview, {
        // this will add a column called BreweryID
    
        foreignKey: {
          allowNull: false
        }
    
      })
    
    
    }
    // Syncs with DB
    // BeerReviewReply.sync();
    
    // Makes the BeerReviewReply Model available for other files (will also create a table)
    return BeerReviewReply;
    }
    