const Offices = require("../models/Offices");

class Admin {
  static async showAll() {
    return Offices.findAll();
  }

  static async showByPk(officeId) {
    return Offices.findByPk(officeId);
  }

  static async add(
    name,
    address,
    city,
    country,
    openingTime,
    closingTime,
    floors,
    phoneNumber
  ) {
    return Offices.create({
      name,
      address,
      city,
      country,
      openingTime,
      closingTime,
      floors,
      phoneNumber,
    });
  }
}

module.exports = { Admin };
