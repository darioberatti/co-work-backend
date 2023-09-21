const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../config/db/db");

class User extends Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DNI: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [8, 8],
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    salt: {
      type: DataTypes.STRING,
    },
    course: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    
  },
  {
    sequelize: db,
    modelName: "user",
  }
);

User.beforeUpdate((user) => {
  if (user.changed("password")) {
    const salt = bcrypt.genSaltSync();
    user.salt = salt;
    return user.hash(user.password, salt).then((hash) => {
      user.password = hash;
    });
  }
});

module.exports = User;
