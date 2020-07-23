// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// // sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");

// Creates a "Reply" model that matches up with DB
module.exports = function(sequelize, DataTypes) {
    var Reply = sequelize.define("Reply", {
      reply: DataTypes.STRING,
      like: DataTypes.STRING
      // userID: DataTypes.INTEGER,
      // breweryID: DataTypes.INTEGER
    });
    
    
    Reply.associate = function(models){
      // models will allow us to referoecne other models synced with databse 
      // ie we are going to referecne the Replymodel
      Reply.belongsTo(models.User, {
        // this will add a column called UserID
    
        foreignKey: {
          allowNull: false
        }
    
      })
    
      Reply.belongsTo(models.Review, {
        // this will add a column called BreweryID
    
        foreignKey: {
          allowNull: false
        }
    
      })
    
    
    }
    // Syncs with DB
    // Reply.sync();
    
    // Makes the Reply Model available for other files (will also create a table)
    return Reply;
    }
    