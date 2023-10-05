const { Sequelize } = require("sequelize");
const { Bookings, Tables, Occupation } = require("../models");

const updateCompletedReservations = async () => {
  console.log("Actualizacion de estado reservas");
  try {
    // Obtén la fecha y hora actual
    const now = new Date();

    // Consulta las reservas que ya han sucedido pero que aún no están completadas
    const reservationsToUpdate = await Bookings.findAll({
      where: {
        day: {
          // Consulta las reservas con fecha anterior a la fecha y hora actual
          [Sequelize.Op.lt]: now,
        },
        status: {
          // Consulta las reservas que no están completadas
          [Sequelize.Op.ne]: 'completed',
        },
      },
    });

    console.log("reservationsToUpdate--->", reservationsToUpdate);

    // Actualiza el estado de las reservas encontradas a "completada"
    for (const res of reservationsToUpdate) {
      await res.update({ status: 'completed' });
    }

    console.log('Reservas completadas actualizadas exitosamente');
  } catch (error) {
    console.error('Error al actualizar reservas:', error);
  }
};

module.exports = {updateCompletedReservations}