// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// // sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");

// Creates a "Review" model that matches up with DB
module.exports = function(sequelize, DataTypes) {
    var Beer = sequelize.define("Beer", {
      beer: DataTypes.STRING,
      style: DataTypes.STRING,
      style2: DataTypes.STRING,
      ibuScore: DataTypes.STRING,
      abv: DataTypes.STRING,
      description: DataTypes.STRING,
      releaseDate: DataTypes.DATE,
      releaseNotes: DataTypes.STRING
    });
    
    
    Beer.associate = function(models){
      // models will allow us to referoecne other models synced with databse 
      // ie we are going to referecne the Beermodel
      Beer.hasMany(models.BeerList, {
      //this will add beerID in beerlist
    
        foreignKey: {
          allowNull: false
        }
    
      })
    
    
    }
    // Syncs with DB
    // Beer.sync();
    
    // Makes the Beer Model available for other files (will also create a table)
    return Beer;
    }
    