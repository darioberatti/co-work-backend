const { Occupation } = require("../models");

class Occupancy {
  static async showAll() {
    return Occupation.findAll({
      include: "table",
    });
  }

}

module.exports = { Occupancy };
