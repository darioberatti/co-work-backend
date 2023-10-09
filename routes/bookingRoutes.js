const express = require("express");
const router = express.Router();
const { validateUser, validateAdmin } = require("../middleware/auth");
const {
  listReservations,
  listUserReservations,
  addReservation,
  deleteReservations,
  editReservations,
} = require("../controllers/bookingController");


//Ruta para listar todas las reservas
router.get("/", validateUser, listReservations);

//Ruta para listar las reservas de un usuario
router.get("/:id", validateUser, listUserReservations);

//Ruta para agregar una reserva
router.post("/", validateUser, addReservation);

//Ruta para eliminar una reserva
router.delete("/:id", validateUser, deleteReservations);

//Ruta para editar cualquier campo de la reserva.
router.put("/:id", validateUser, editReservations);

module.exports = router;
