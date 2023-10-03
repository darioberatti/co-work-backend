const { Bookings } = require("../models");

class Book {
  static async showAll() {
    try {
      return Bookings.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  static async showByPk(userId) {
    try {
      return Bookings.findAll({ where: { userId } });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async add(userId, reservationData) {
    // console.log("reservationData-->", reservationData);
    reservationData = {
      userId: userId,
      ...reservationData,
    };
    try {
      return Bookings.create(reservationData);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = { Book };
