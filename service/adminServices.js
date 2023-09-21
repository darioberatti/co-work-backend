const Offices = require("../models/Offices");

class Admin {

  static async showAll() {
    try {
      return Offices.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  static async showByPk(officeId) {
    try {
      return Offices.findByPk(officeId);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async add(
    name,
    address,
    city,
    country,
    floors,
  ) {
    try {
      if (
        !name ||
        !address ||
        !city ||
        !country ||
        !floors
      ) {
        res.status(400).json({ error: "Todos los campos son requeridos" });
      }

      return Offices.create({
        name,
        address,
        city,
        country,
        floors,
      })
    } catch (error) {
      throw new Error(error);
    }
  }
  
}

module.exports = { Admin };
