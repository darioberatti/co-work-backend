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
    province: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[A-Za-z0-9\s]+$/,
          msg: "La cadena debe contener letras, espacios y números solamente.",
        },
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    openingTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    closingTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    floorsNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
    },
    urlImg: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    status: {
      type: DataTypes.ENUM,
      defaultValue: "enabled",
      values: ["enabled", "disabled"]
    }
  },
  { sequelize: db, modelName: "offices" }
);

module.exports = Offices;
