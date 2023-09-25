const Users = require("../models/Users");

class Staff {
  static async showAll() {
    try {
      return Users.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  static async showByPk(userId) {
    try {
      return Users.findByPk(userId);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async add(name, lastName, DNI, age, email, course) {
    try {
      if (!name || !lastName || !DNI || !age || !email || !course) {
        throw new Error("Todos los campos son requeridos");
      }

      return Users.create({
        name,
        lastName,
        DNI,
        age,
        email,
        course,
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
