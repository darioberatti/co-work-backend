const { Users, Roles } = require("../models");

async function seedDataBaseRoles() {
  try {
    await Roles.bulkCreate([
      {
        name: "admin",
      },
      {
        name: "staff",
      },
      {
        name: "student",
      },
    ]);
  } catch (error) {
    console.error("Error al sembrar categorías:", error);
  }
}

async function seedDataBase() {
  try {
    await seedDataBaseRoles(); // Espera a que se completen las categorías
    await Users.bulkCreate([
      {
        name: "Admin",
        lastName: "CoWork",
        DNI: 11111111,
        email: "e.retrofutbolclub@gmail.com",
        age: 25,
        password: "123456",
        salt: "",
        course: "admin",
        roleId: 1,
      },
      {
        name: "Pedro",
        lastName: "Lopez",
        DNI: 12345678,
        email: "pedro@gmail.com",
        age: 30,
        password: "123456",
        salt: "",
        course: "Julio 2023",
        roleId: 3,
      },
    ]);
  } catch (error) {
    console.error("Error al sembrar la base de datos:", error);
  }
}

seedDataBase();
