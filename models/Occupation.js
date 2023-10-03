const { DataTypes, Model } = require("sequelize");
const db = require("../config/db/db");

class Occupation extends Model {}

Occupation.init(
  {
    day: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    shift: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxCapacity: {
      type: DataTypes.INTEGER,
    },
    actualCapacity: {
      type: DataTypes.INTEGER
    }
  },
  { sequelize: db, modelName: "occupation" }
);

module.exports = Occupation;