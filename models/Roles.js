const { DataTypes, Model } = require("sequelize");
const db = require("../config/db/db");

class Roles extends Model {}

Roles.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "roles" }
);

module.exports = Roles;
