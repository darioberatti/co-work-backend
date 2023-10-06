const { Sequelize } = require("sequelize");
const { Bookings, Tables, Occupation } = require("../models");

const updateCompletedReservations = async () => {
  console.log("Actualizacion de estado reservas");
  try {
    const now = new Date();

    // Consulta las reservas que ya han sucedido pero que aún no están completadas
    const reservationsToUpdate = await Bookings.findAll({
      where: {
        day: {
          [Sequelize.Op.lt]: now,
        },
        status: {
          [Sequelize.Op.ne]: "completed",
        },
      },
    });
    for (const res of reservationsToUpdate) {
      await res.update({ status: "completed" });
    }

    console.log("Reservas completadas actualizadas exitosamente");
  } catch (error) {
    console.error("Error al actualizar reservas:", error);
  }
};

module.exports = { updateCompletedReservations };
