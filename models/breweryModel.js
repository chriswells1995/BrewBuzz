// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// // sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");

// Creates a "Brewery" model that matches up with DB
module.exports = function(sequelize, DataTypes) {
var Brewery = sequelize.define("Brewery", {
  name: DataTypes.STRING,
  
  website: {
    type: DataTypes.STRING,
    allowNull:true,
  },
  breweryType: {
    type: DataTypes.STRING,
    allowNull:true,
  },
  street: {
    type: DataTypes.STRING,
    allowNull:true,
  },
  city: {
   type: DataTypes.STRING,
   allowNull:true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull:true,
   },
  postalCode: {
   type: DataTypes.STRING,
   allowNull:true,
  },
  borderingZips: {
    type: DataTypes.STRING,
    allowNull:true,
   },
   logo: {
    type: DataTypes.STRING,
    allowNull:true,
   },
  totalRating: DataTypes.DECIMAL,
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull:true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull:true,
   },
   longitude: {
    type: DataTypes.STRING,
   allowNull:true,
   },
  latitude: {
    type: DataTypes.STRING,
    allowNull:true,
   },
   tags: {
    type: DataTypes.STRING,
    allowNull:true,
   }
   
});

// Brewery has many reviews
// utlize the .associate() method to create an association between them
Brewery.associate =function (models){
  // models will allow us to reference other models synced with this database
  // ie we are going to referecne the Review model
  Brewery.hasMany(models.Review, {} )

  Brewery.hasMany(models.BeerList, {
    //adds breweryID to beer list
    foreignKey: {
      allowNull: false
    }

  })

  Brewery.hasMany(models.Event, {
    //adds breweryID to beer list
    foreignKey: {
      allowNull: false
    }

  })


}

// Syncs with DB
// Brewery.sync();

// Makes the Brewery Model available for other files (will also create a table)
return Brewery;
}
