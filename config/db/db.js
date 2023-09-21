const Sequelize = require("sequelize");

const db = new Sequelize(
  "cowork",
  "cowork_user",
  "XfOiCVayOLvjY6Jn9Xyr4yryVabARtyg",
  {
    host: "dpg-ck6aa3vq54js73a66jkg-a",
    dialect: "postgres",
    logging: false,
  }
);

/* const db = new Sequelize("cowork", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
}); */

module.exports = db;
