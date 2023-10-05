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

  static async getTable(userId) {
    try {
      return Bookings.findAll({ where: { userId } });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async add(userId, reservationData) {
    // console.log("reservationData-->", reservationData);
    
    try {
      
    } catch (error) {
      
    }
  }
}

module.exports = { Book };
