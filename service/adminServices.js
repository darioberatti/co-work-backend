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
    province,
    openingTime,
    closingTime,
    floors,
    phoneNumber,
    urlImg
  ) {
    return Offices.create({
      name,
      address,
      city,
      province,
      country,
      openingTime,
      closingTime,
      floors,
      phoneNumber,
      urlImg,
    });
  }
}

module.exports = { Admin };
