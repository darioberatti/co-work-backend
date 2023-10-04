const Bookings = require("./Bookings");
const Offices = require("./Offices");
const Roles = require("./Roles");
const Tables = require("./Tables");
const Users = require("./Users");
// const Floors = require("./Floors");
const Occupation = require("./Occupation");

Users.belongsTo(Roles, { as: "role" });
// Tables.belongsTo(Offices, { as: "office" });
Bookings.belongsTo(Users, { as: "user" });
Bookings.belongsTo(Tables, { as: "table" });
Occupation.belongsTo(Tables, { as: "table" });
Offices.hasMany(Tables, { as: "tables" });


// Offices.hasMany(Floors, { as: "floors" });
// Floors.hasMany(Tables, { as: "tables" });

module.exports = {
  Bookings,
  Offices,
  Roles,
  Tables,
  Users,
  // Floors,
  Occupation,
};
