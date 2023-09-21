const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");

const db = new Sequelize(
  "cowork",
  process.env.USER || "cowork_user",
  process.env.PASSWORD || "XfOiCVayOLvjY6Jn9Xyr4yryVabARtyg",
  {
    host: process.env.HOST || "dpg-ck6aa3vq54js73a66jkg-a",
    dialect: "postgres",
    logging: false,
  }
);

/* const db = new Sequelize("cowork", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
  "dpg-ck6aa3vq54js73a66jkg-a"
  "cowork_user"
  "XfOiCVayOLvjY6Jn9Xyr4yryVabARtyg"
}); */

module.exports = db;
