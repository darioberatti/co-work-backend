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
const { updateCompletedReservations } = require("./utils/updateReservations");
const { generateToken } = require("./config/tokens");

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

// Middleware para cambiar el nombre de la cookie (Deploy)
const token = generateToken();
console.log("TOKEN EN INDEX----->", token);

app.use((req, res, next) => {
  res.cookie("token", token, {
    domain: process.env.FRONT_DOMAIN,
  });

  next();
});

app.use("/", routes);
app.use("/health", (req, res) => {
  res.sendStatus(200);
});

// Validacion variables de entorno
console.log(envValidation);

const intervaloDeActualizacion = 30 * 60 * 1000; // Media hora en milisegundos
setInterval(updateCompletedReservations, intervaloDeActualizacion);

app.use((err, req, res, next) => {
  console.log("ERROR");
  console.log(err);
  res.status(500).send(err.message);
});

db.sync({ force: false })
  .then(() => {
    console.log("DB Connected");
    app.listen(port, () => console.log(`Servidor escuchando ${port}`));
  })
  .catch(console.error);
