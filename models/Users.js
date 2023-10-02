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
      validate: {
        is: {
          args: /^[A-Za-z\s]+$/, // Expresión regular que permite letras y espacios
          msg: 'El nombre solo debe contener letras y espacios.',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[A-Za-z\s]+$/, // Expresión regular que permite letras y espacios
          msg: 'El apellido solo debe contener letras y espacios.',
        },
      },
    },
    DNI: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        // will only allow numbers & only allow values with length between 8 and 8
        isNumeric: true,
        len: [8, 8],
      },
    },
    birth: {
      type: DataTypes.DATE,
      allowNull: true,
      // validate: {
      //   // will only allow numbers
      //   isNumeric: true,
      // },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        // checks for email format (foo@bar.com)
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        // Will only allow values with minimum length of 6 characters
        len: [6, Infinity],
      },
    },
    salt: {
      type: DataTypes.STRING,
    },
    course: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      // // An ENUM with allowed values 'pending', 'enabled' and 'disabled'
      type: DataTypes.ENUM,
      defaultValue: "pending",
      values: ["pending", "enabled", "disabled"]
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

// User.beforeBulkCreate((user) => {
//   if (user.password) {
//     console.log("Entro a before Bulk create");
//     const salt = bcrypt.genSaltSync();
//     user.salt = salt;
//     return user.hash(user.password, salt).then((hash) => {
//       user.password = hash;
//     });
//   }
// });


User.beforeBulkCreate((users) => {
  return Promise.all(users.map(async (user) => {
    const salt = bcrypt.genSaltSync();
    user.salt = salt;
    user.password = await user.hash(user.password, salt);
  }));
});

module.exports = User;
