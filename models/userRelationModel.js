// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// // sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");

// Creates a "userRelation" model that matches up with DB
module.exports = function(sequelize, DataTypes) {
    var userRelation = sequelize.define("userRelation", {
      status: DataTypes.STRING
      // userID: DataTypes.INTEGER,
      // breweryID: DataTypes.INTEGER
    });
    
    
    userRelation.associate = function(models){
      // models will allow us to referoecne other models synced with databse 
      // ie we are going to referecne the userRelationmodel
      userRelation.belongsTo(models.User, {
        // this will add a column called userOneID
    
        foreignKey: 'userOneID'
      });
      userRelation.belongsTo(models.User, {
        // this will add a column called userTwoID
    
        foreignKey: 'userTwoID'
    
      });
      userRelation.belongsTo(models.User, {
        // this will add a column called actionUser
        //action user is the user who performed the last action relating to a friendship
        
        foreignKey: {
          allowNull: false
        },
        foreignKey : 'actionUser'
    
      })
    
    
    }
    // Syncs with DB
    // userRelation.sync();
    
    // Makes the userRelation Model available for other files (will also create a table)
    return userRelation;
    }
    