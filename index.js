const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/db/db");
const routes = require("./routes");
const { models } = require("./models");
const { envValidation } = require("./config/env/envValidation");



const port = process.env.PORT;

app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use("/", routes);

// Validacion variables de entorno
console.log(envValidation);

db.sync({ force: false })
  .then(() => {
    console.log("DB Connected");
    app.listen(port, () => console.log(`Servidor escuchando ${port}`));
  })
  .catch(console.error);
