const { DataTypes, Model } = require("sequelize");
const db = require("../config/db/db");

class Roles extends Model {}

Roles.init(
  {
    name: {
      // // An ENUM with allowed values 'pending', 'enabled' and 'disabled'
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["staff", "admin", "student"]
    },
  },
  { sequelize: db, modelName: "roles" }
);

module.exports = Roles;
