const { DataTypes, Model } = require("sequelize");
const db = require("../config/db/db");

class Offices extends Model {}

Offices.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    openingTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    closingTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    floorsNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize: db, modelName: "offices" }
);

module.exports = Offices;
