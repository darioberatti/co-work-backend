const Users = require("../models/Users");
const Roles = require("../models/Roles");

class Staff {
  static async showAll() {
    return Users.findAll({ include: "role" });
  }

  static async showByPk(userId) {
    return Users.findByPk(userId);
  }

  static async add(name, lastName, DNI, age, email, course) {
    return Users.create({
      name,
      lastName,
      DNI,
      age,
      email,
      course,
    });
  }

  static async edit(userData, userId) {
    const user = await Users.findByPk(userId, { include: "role" });
    const result = await user.update(userData, { returning: true });
    return result;
  }
}

module.exports = { Staff };
