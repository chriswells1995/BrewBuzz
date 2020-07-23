// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// // sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");

// Creates a "userEvent" model that matches up with DB
module.exports = function(sequelize, DataTypes) {
    var userEvent = sequelize.define("userEvent", {
      status: DataTypes.STRING
      // userID: DataTypes.INTEGER,
      // breweryID: DataTypes.INTEGER
    });
    
    
    userEvent.associate = function(models){
      // models will allow us to referoecne other models synced with databse 
      // ie we are going to referecne the userEventmodel
      userEvent.belongsTo(models.User, {
        // this will add a column called UserID
    
        foreignKey: {
          allowNull: false
        }
    
      })
    
      userEvent.belongsTo(models.Event, {
        // this will add a column called BreweryID
    
        foreignKey: {
          allowNull: false
        }
    
      })
    
    
    }
    // Syncs with DB
    // userEvent.sync();
    
    // Makes the userEvent Model available for other files (will also create a table)
    return userEvent;
    }
    