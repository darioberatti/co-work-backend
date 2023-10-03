const express = require("express");
const router = express.Router();
const { validateUser, validateAdmin } = require("../middleware/auth");
const {
  listReservations,
  listUserReservations,
  addReservation,
} = require("../controllers/bookingController");
const { Bookings, Occupation, Tables } = require("../models");

//Ruta para listar todas las reservas
router.get("/", validateUser, listReservations);

//Ruta para listar las reservas de un usuario
router.get("/:id", validateUser, listUserReservations);

//Ruta para agregar una reserva
router.post("/", validateUser, async (req, res) => {
  try {
    const reservationData = req.body;
    const { userId } = req.user;

    reservationData.userId = userId;

    const table = await Tables.findByPk(reservationData.tableId);

    const existingOccupation = await Occupation.findOne({
      where: {
        tableId: reservationData.tableId,
        day: reservationData.day,
        shift: reservationData.shift,
      },
    });

    if (existingOccupation && existingOccupation.actualCapacity === 0) {
      return res.status(400).send("No hay lugares disponibles");
    }

    if (!existingOccupation) {
      const newOccupation = await Occupation.create({
        day: reservationData.day,
        shift: reservationData.shift,
        tableId: reservationData.tableId,
        maxCapacity: table.capacity,
        actualCapacity: table.capacity - 1,
      });
    }

    const newReservation = await Bookings.create(reservationData);

    if (existingOccupation) {
      existingOccupation.actualCapacity -= 1;
      await existingOccupation.save();
    }

    res.status(201).send(newReservation);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error en la reserva");
  }
});

//Ruta para eliminar una reserva
router.delete("/:id", validateUser, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReservation = await Bookings.findByPk(id);

    const existingOccupation = await Occupation.findOne({
      where: {
        tableId: deletedReservation.tableId,
        day: deletedReservation.day,
        shift: deletedReservation.shift,
      },
    });

    existingOccupation.actualCapacity += 1;
    await existingOccupation.save();

    const deleted = await Bookings.destroy({ where: { id } });
    res.sendStatus(204)
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar reserva");
  }
});

module.exports = router;
