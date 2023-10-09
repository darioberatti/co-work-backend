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
      type: DataTypes.ENUM,
      values: ["mañana", "tarde"],
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      defaultValue:"active",
      values: ["active", "completed", "canceled"],
    },
  },
  { sequelize: db, modelName: "booking" }
);

module.exports = Booking;
