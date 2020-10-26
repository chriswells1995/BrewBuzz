// Dependencies
// =============================================================

module.exports = function(sequelize, DataTypes) {
    var resetVariable = sequelize.define("ResetVariable", {
      password1: DataTypes.STRING,
      password2: DataTypes.STRING,
      email: DataTypes.STRING,
      token: DataTypes.STRING
    });

    return resetVariable;
    }
    