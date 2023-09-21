const { DataTypes, Model } = require("sequelize");
const db = require("../config/db/db");

class Tables extends Model {}

Tables.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    floor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "tables" }
);

module.exports = Tables;
