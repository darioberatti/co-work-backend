const express = require("express");
const router = express.Router();
const {
  listOccupations,
  listOfficeOccupations,
} = require("../controllers/occupationController");

const { validateUser } = require("../middleware/auth");

//Ruta para listar todas las ocupaciones
router.get("/", validateUser, listOccupations);


module.exports = router;
