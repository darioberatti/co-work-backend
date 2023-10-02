const Users = require("../models/Users");

class Staff {
  static async showAll() {
    try {
      return Users.findAll({ include: "role" });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async showByPk(userId) {
    try {
      return Users.findByPk(userId, { include: "role" });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async add(name, lastName, DNI, birth, email, course) {
    try {
      if (!name || !lastName || !DNI || !birth || !email || !course) {
        throw new Error("Todos los campos son requeridos");
      }

      const exists = await Users.findOne({ where: { email } });
    if (exists) throw new Error("Este usuario ya existe")

      return Users.create({
        name,
        lastName,
        DNI,
        birth,
        email,
        course,
        roleId: 3,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async edit(userId, userData) {
    try {
      const user = await Users.findByPk(userId);

      if (!user) throw new Error("Usuario no encontrado");

      const result = await user.update(userData, { returning: true });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = { Staff };
