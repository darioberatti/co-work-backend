const { DataTypes, Model } = require("sequelize");
const db = require("../config/db/db");

class Offices extends Model {}

Offices.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[A-Za-z0-9\s]+$/,
          msg: "La cadena debe contener letras, espacios y números solamente.",
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[A-Za-z0-9\s]+$/,
          msg: "La cadena debe contener letras, espacios y números solamente.",
        },
      },
    },
    city: {
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
      validate: {
        is: {
          args: /^[A-Za-z\s]+$/, // Expresión regular que permite letras y espacios
          msg: "La ciudad solo debe contener letras y espacios.",
        },
      },
    },
    openingTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    closingTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    floors: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        // will only allow numbers
        isNumeric: true,
      },
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
    },
  },
  { sequelize: db, modelName: "offices" }
);

module.exports = Offices;
