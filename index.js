const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/db/db");
const routes = require("./routes");
const { models } = require("./models");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use("/", routes);

db.sync({ force: false })
  .then(() => {
    console.log("DB Connected");
    app.listen(3001, () =>
      console.log(`Servidor escuchando en el puerto ${3001}`)
    );
  })
  .catch(console.error);
