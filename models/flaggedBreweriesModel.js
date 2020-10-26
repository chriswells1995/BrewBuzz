// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// // sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");

// Creates a "FlaggedBreweries" model that matches up with DB
module.exports = function(sequelize, DataTypes) {
    var FlaggedBreweries = sequelize.define("FlaggedBreweries", {
      
      note: {
        type: DataTypes.STRING,
        allowNull:true,
      },
      completed: {
        type: DataTypes.INTEGER,
        allowNull: true
      }

    });
    
    // FlaggedBreweries has many reviews
    // utlize the .associate() method to create an association between them
    // 
    FlaggedBreweries.associate =function (models){
      // models will allow us to reference other models synced with this database
      // ie we are going to referecne the Review model
    
      FlaggedBreweries.belongsTo(models.Brewery, {
        // this will add a column called BreweryID
    
        foreignKey: {
          allowNull: false
        }
    
      })
    
      FlaggedBreweries.belongsTo(models.FlagOptions, {
        // this will add a column called BreweryID
    
        foreignKey: {
          name: "flagoptionsId",
          allowNull: false
        }
    
      })

      FlaggedBreweries.belongsTo(models.User, {
        // this will add a column called BreweryID
    
        foreignKey: {
          allowNull: false
        }
    
      })
    
    
    }
    
    // Syncs with DB
    // FlaggedBreweries.sync();
    
    // Makes the FlaggedBreweries Model available for other files (will also create a table)
    return FlaggedBreweries;
    }