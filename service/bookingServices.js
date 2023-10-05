const { Bookings, Tables, Occupation } = require("../models");

class Book {
  static async showAll() {
    try {
      return Bookings.findAll({
        include: "table"
      });
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

  static async getTable(tableId) {
    try {
      return Tables.findByPk(tableId);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getExistingOccupation(tableId, day, shift) {
    try {
      return await Occupation.findOne({
        where: {
          tableId: tableId,
          day: day,
          shift: shift,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async createOccupation(day, shift, tableId, capacity) {
    try {
      return await await Occupation.create({
        day: day,
        shift: shift,
        tableId: tableId,
        maxCapacity: capacity,
        actualCapacity: capacity - 1,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async addReservation(reservationData) {
    try {
      return await Bookings.create(reservationData);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async findBooking(id) {
    try {
      return await Bookings.findByPk(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async deleteReservation(id) {
    try {
      return await Bookings.destroy({ where: { id } });
    } catch (error) {
      throw new Error(error);
    }
  }

  
}

module.exports = { Book };
