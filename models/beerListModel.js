// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// // sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");

// Creates a "BeerList" model that matches up with DB
module.exports = function(sequelize, DataTypes) {
    var BeerList = sequelize.define("BeerList", {
      status: DataTypes.STRING
      // userID: DataTypes.INTEGER,
      // breweryID: DataTypes.INTEGER
    });
    
    
    BeerList.associate = function(models){
      // models will allow us to referoecne other models synced with databse 
      // ie we are going to referecne the BeerListmodel
    //   BeerList.belongsTo(models.User, {
    //     // this will add a column called UserID
    
    //     foreignKey: {
    //       allowNull: false
    //     }
    
    //   })
    
    //   BeerList.belongsTo(models.Brewery, {
    //     // this will add a column called BreweryID
    
    //     foreignKey: {
    //       allowNull: false
    //     }
    
    //   })
    
    
    }
    // Syncs with DB
    // BeerList.sync();
    
    // Makes the BeerList Model available for other files (will also create a table)
    return BeerList;
    }
    