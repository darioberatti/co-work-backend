const Offices = require("../models/Offices");
const Floors = require("../models/Floors")

class Admin {
  static async showAll() {
    return Offices.findAll({
      include: {
        model: Floors,
        as: "floors",
        include: "tables", // Esto incluirá las mesas dentro de los pisos
      },
    });
  }
  
  static async showByPk(officeId) {
    return Offices.findByPk(officeId, {
      include: {
        model: Floors,
        as: "floors",
        include: "tables", // Esto incluirá las mesas dentro de los pisos
      },
    });
  }

  static async add(
    name,
    address,
    city,
    country,
    openingTime,
    closingTime,
    floorsNumber,
    phoneNumber
  ) {
    return Offices.create({
      name,
      address,
      city,
      country,
      openingTime,
      closingTime,
      floorsNumber,
      phoneNumber,
    });
  }
}

module.exports = { Admin };
