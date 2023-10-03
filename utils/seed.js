const { Users, Roles, Offices, Floors, Tables } = require("../models");

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
    await seedDataBaseRoles(); // Espera a que se completen los roles
    await Users.bulkCreate([
      {
        name: "Admin",
        lastName: "CoWork",
        DNI: 11111111,
        email: "e.retrofutbolclub@gmail.com",
        birth: "1998-05-04 11:00:00",
        password: "123456",
        salt: "",
        course: "admin",
        roleId: 1,
        status: "enabled",
      },
      {
        name: "Pedro",
        lastName: "Lopez",
        DNI: 12345678,
        email: "pedro@gmail.com",
        birth: "2000-09-26 11:00:00",
        password: "123456",
        salt: "",
        course: "Julio 2023",
        roleId: 2,
        status: "enabled",
      },
    ]);

    await Offices.bulkCreate([
      {
        name: "The Works Torre Alem Plaza",
        address: "Av Leandro N Alem 855",
        city: "CABA",
        province: "Buenos Aires",
        country: "Argentina",
        openingTime: "9 hs",
        closingTime: "18 hs",
        floorsNumber: 1,
        phoneNumber: 1176103130,
        urlImg: [
          "https://theworks.com.ar/wp-content/uploads/2023/04/w5-1-1024x683.jpg",
          "https://theworks.com.ar/wp-content/uploads/2023/04/r6.jpg",
          "https://theworks.com.ar/wp-content/uploads/2023/04/r7.jpg",
          "https://theworks.com.ar/wp-content/uploads/2023/04/r9.jpg",
        ],
      },
      {
        name: "La Maquinita Córdoba",
        address: "San Lorenzo 25",
        city: "Córdoba",
        province: "Córdoba",
        country: "Argentina",
        openingTime: "8:30 hs",
        closingTime: "20:30 hs",
        floorsNumber: 2,
        phoneNumber: 3517000137,
        urlImg: [
          "https://lamaquinita.co/wp-content/uploads/2022/04/Cordoba-1.jpg",
          "https://lamaquinita.co/wp-content/uploads/2022/04/Cordoba-12.jpg",
          "https://lamaquinita.co/wp-content/uploads/2022/04/Cordoba-4-1.jpg",
          "https://lamaquinita.co/wp-content/uploads/2022/04/Cordoba-6.jpg",
        ],
      },
      {
        name: "La Maquinita Quilmes",
        address: "Av Caseros 1750",
        city: "Don Bosco",
        province: "Buenos Aires",
        country: "Argentina",
        openingTime: "8:30 hs",
        closingTime: "20:30 hs",
        floorsNumber: 1,
        phoneNumber: 1132211015,
        urlImg: [
          "https://lamaquinita.co/wp-content/uploads/2023/05/MAQUINITA.quilmes.43.jpg",
          "https://lamaquinita.co/wp-content/uploads/2023/05/MAQUINITA.quilmes.22.jpg",
          "https://lamaquinita.co/wp-content/uploads/2023/05/MAQUINITA.quilmes.15.jpg",
        ],
      },
    ]);
    await Floors.bulkCreate([
      {
        number: 2,
        tablesNumber: 1,
        officeId: 1,
      },
      {
        number: 3,
        tablesNumber: 1,
        officeId: 1,
      },
      {
        number: 3,
        tablesNumber: 1,
        officeId: 2,
      },
    ]);
    await Tables.bulkCreate([
      {
        name: `Floor 1 - Table A`,
        floor: 1,
        capacity: 6,
        floorId: 1,
      },
      {
        name: `Floor 2 - Table A`,
        floor: 2,
        capacity: 6,
        floorId: 2,
      },
      {
        name: `Floor 1 - Table A`,
        floor: 1,
        capacity: 6,
        floorId: 3,
      },
    ]);
  } catch (error) {
    console.error("Error al sembrar la base de datos:", error);
  }
}

seedDataBase();
