// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// // sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");

// Creates a "FlagOptions" model that matches up with DB
module.exports = function(sequelize, DataTypes) {
    var flagoptions = sequelize.define("FlagOptions", {
      
      flagType: {
        type: DataTypes.STRING,
        allowNull:true,
      }

    });
    
    // FlagOptions has many reviews
    // utlize the .associate() method to create an association between them
    flagoptions.associate =function (models){
      // models will allow us to reference other models synced with this database
      // ie we are going to referecne the Review model
    
    //   flagoptions.hasMany(models.FlaggedBreweries, {
    //     //adds flagoptionsID to beer list
    //     foreignKey: {
    //       allowNull: false
    //     }
    
    //   })
    

      
    
    
    }
    
    // Syncs with DB
    // FlagOptions.sync();
    
    // Makes the FlagOptions Model available for other files (will also create a table)
    return flagoptions;
    }
    