// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// // sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");

// Creates a "userBeer" model that matches up with DB
module.exports = function(sequelize, DataTypes) {
    var userBeer = sequelize.define("userBeer", {
      status: DataTypes.STRING
      // userID: DataTypes.INTEGER,
      // breweryID: DataTypes.INTEGER
    });
    
    
    userBeer.associate = function(models){
      // models will allow us to referoecne other models synced with databse 
      // ie we are going to referecne the userBeermodel
      userBeer.belongsTo(models.User, {
        // this will add a column called UserID
    
        foreignKey: {
          allowNull: false
        }
    
      })
    
      userBeer.belongsTo(models.Beer, {
        // this will add a column called BreweryID
    
        foreignKey: {
          allowNull: false
        }
    
      })
    
    
    }
    // Syncs with DB
    // userBeer.sync();
    
    // Makes the userBeer Model available for other files (will also create a table)
    return userBeer;
    }
    