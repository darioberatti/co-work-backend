const { Users } = require("../models");

class User {
  static async findByEmail(email) {
    return Users.findOne({
      where: { email },
      include: "role",
    });
  }

  static async validateUserPassword(user, password) {
    return user.validatePassword(password);
  }
}

module.exports = { User };
