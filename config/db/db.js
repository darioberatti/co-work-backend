const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");

const db = new Sequelize("cowork", process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: "postgres",
  logging: false,
});

module.exports = db;
