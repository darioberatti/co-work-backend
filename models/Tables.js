const { DataTypes, Model } = require("sequelize");
const db = require("../config/db/db");

class Tables extends Model {}

Tables.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   // will only allow alphanumeric characters, so "_abc" will fail
      //   isAlphanumeric: true,
      // },
    },
    floor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        // will only allow numbers
        isNumeric: true,
      },
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 6,
      validate: {
        // will only allow numbers
        isNumeric: true,
      },
    },
  },
  { sequelize: db, modelName: "tables" }
);

module.exports = Tables;
