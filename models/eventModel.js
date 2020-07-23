// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// // sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");

// Creates a "Event" model that matches up with DB
module.exports = function(sequelize, DataTypes) {
    var Event = sequelize.define("Event", {
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      streetAddress: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      description: DataTypes.STRING,
      dateTime: DataTypes.DATETIME,
      status: DataTypes.STRING
      // userID: DataTypes.INTEGER,
      // breweryID: DataTypes.INTEGER
    });
    
    
    Event.associate = function(models){
      // models will allow us to referoecne other models synced with databse 
      // ie we are going to referecne the Eventmodel
      Event.belongsTo(models.User, {
        // this will add a column called UserID
    
        foreignKey: {
          allowNull: false
        }
    
      })
    
      Event.belongsTo(models.Event, {
        // this will add a column called BreweryID
    
        foreignKey: {
          allowNull: false
        }
    
      })
    
    
    }
    // Syncs with DB
    // Event.sync();
    
    // Makes the Event Model available for other files (will also create a table)
    return Event;
    }
    