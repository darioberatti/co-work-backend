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
    origin: "https://co-work-p5-frontend.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use("/", routes);

db.sync({ force: false })
  .then(() => {
    console.log("DB Connected");
    app.listen(5432, () => console.log(`Servidor escuchando`));
  })
  .catch(console.error);
