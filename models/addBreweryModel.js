// Creates a "AddBreweries" model that matches up with DB
module.exports = function (sequelize, DataTypes) {
  var AddBreweries = sequelize.define("AddBreweries", {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  // Makes the AddBreweries Model available for other files (will also create a table)
  return AddBreweries;
};
