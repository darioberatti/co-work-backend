const { Sequelize } = require("sequelize");
const { Bookings, Tables, Occupation } = require("../models");

const updateCompletedReservations = async () => {
  console.log("Actualizacion de estado reservas");
  try {
    const gmtNow = new Date();
    const now = subtractTimeFromDate(gmtNow, 3);
    const uncancelledReservationTime = addHoursToDate(now, 2)

    // Consulta las reservas que ya han sucedido pero que aún no están completadas
    const reservationsToUpdate = await Bookings.findAll({
      where: {
        day: {
          [Sequelize.Op.lt]: uncancelledReservationTime,
        },
        status: {
          [Sequelize.Op.eq]: "active",
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

function subtractTimeFromDate(objDate, intHours) {
  var numberOfMlSeconds = objDate.getTime();
  var addMlSeconds = intHours * 60 * 60000;
  var newDateObj = new Date(numberOfMlSeconds - addMlSeconds);
  return newDateObj;
}

function addHoursToDate(objDate, intHours) {
  var numberOfMlSeconds = objDate.getTime();
  var addMlSeconds = intHours * 60 * 60000;
  var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
  return newDateObj;
}

module.exports = { updateCompletedReservations };
