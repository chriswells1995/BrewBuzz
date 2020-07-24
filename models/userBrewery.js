// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// // sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");

// Creates a "userBrewery" model that matches up with DB
module.exports = function(sequelize, DataTypes) {
    var userBrewery = sequelize.define("userBrewery", {
      status: DataTypes.STRING
      // userID: DataTypes.INTEGER,
      // breweryID: DataTypes.INTEGER
    });
    
    
    userBrewery.associate = function(models){
      // models will allow us to referoecne other models synced with databse 
      // ie we are going to referecne the userBrewerymodel
      userBrewery.belongsTo(models.User, {
        // this will add a column called UserID
    
        foreignKey: {
          allowNull: false
        }
    
      })
    
      userBrewery.belongsTo(models.Brewery, {
        // this will add a column called BreweryID
    
        foreignKey: {
          allowNull: false
        }
    
      })
    
    
    }
    // Syncs with DB
    // userBrewery.sync();
    
    // Makes the userBrewery Model available for other files (will also create a table)
    return userBrewery;
    }
    