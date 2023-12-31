const { Offices, Floors, Tables } = require("../models");

class Admin {
  static async showAll() {
    return Offices.findAll({
      include: {
        model: Tables,
        as: "tables",
      },
    });
  }

  static async showByPk(officeId) {
    return Offices.findByPk(officeId, {
      include: {
        model: Tables,
        as: "tables",
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

  // static async relation(result, floorsNumber) {
  //   const floorsPromises = [];
  //   for (let i = 1; i <= floorsNumber; i++) {
  //     const floor = await Floors.create({
  //       number: i,
  //       tablesNumber: 1,
  //     });
  //     const tablePromises = [];
  //     for (let j = 1; j <= floor.tablesNumber; j++) {
  //       tablePromises.push(
  //         Tables.create({
  //           name: `Floor ${i} - Table A`,
  //           floor: floor.number,
  //           capacity: 6,
  //         })
  //       );
  //     }
  //     const createdTables = await Promise.all(tablePromises);
  //     await floor.addTables(createdTables);
  //     await result.addFloors(floor);
  //     floorsPromises.push(floor);
  //   }

  //   await result.addFloors(floorsPromises);
  // }

  static async createTable(name, floor, capacity, officeId) {
    return Tables.create({ name, floor, capacity, officeId });
  }
  static async destroyTable(tableId) {
    return Tables.destroy({ where: { id: tableId } });
  }
  static async getOfficesTables(officeId) {
    return Tables.findAll({ where: { officeId } });
  }
}

module.exports = { Admin };
