const { DataTypes, Model } = require("sequelize");
const db = require("../config/db/db");

class Booking extends Model {}

Booking.init(
  {
    day: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    shift: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: db, modelName: "booking" }
);

module.exports = Booking;
