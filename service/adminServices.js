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
    province,
    openingTime,
    closingTime,
    floorsNumber,
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
      floorsNumber,
      phoneNumber,
      urlImg,
    });
  }

  static async edit(officeId, officeData) {
    try {
      const office = await Offices.findByPk(officeId);

      if (!office) throw new Error("Usuario no encontrado");

      const result = await office.update(officeData, { returning: true });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = { Admin };
