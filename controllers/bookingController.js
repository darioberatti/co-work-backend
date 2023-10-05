const { Tables, Occupation, Bookings } = require("../models");
const { Book } = require("../service/bookingServices");

exports.listReservations = async (req, res) => {
  try {
    const response = await Book.showAll();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.listUserReservations = async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await Book.showByPk(userId);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};



exports.addReservation = async (req, res) => {
  try {
    const reservationData = req.body;
    const { userId } = req.user;

    //Le asignamos la reserva al usuario
    reservationData.userId = userId;

    //Buscamos la mesa de la reserva
    const table = await Tables.findByPk(reservationData.tableId);

    //Buscamos la ocupacion de la mesa en el dia y turno solicitados
    const existingOccupation = await Occupation.findOne({
      where: {
        tableId: reservationData.tableId,
        day: reservationData.day,
        shift: reservationData.shift,
      },
    });
    
    //Si la capacidad actual es 0, no se puede reservar
    if (existingOccupation && existingOccupation.actualCapacity === 0) {
      return res.status(400).send("No hay lugares disponibles");
    }

    //Si no existe ocupacion, se crea una con la fecha, mesa, turno, capacidad maxima y actual
    if (!existingOccupation) {
      const newOccupation = await Occupation.create({
        day: reservationData.day,
        shift: reservationData.shift,
        tableId: reservationData.tableId,
        maxCapacity: table.capacity,
        actualCapacity: table.capacity - 1,
      });
    }

    //Creamos la nueva reserva
    const newReservation = await Bookings.create(reservationData);

    //Si existe la ocupacion, le restamos uno a la capacidad actual
    if (existingOccupation) {
      existingOccupation.actualCapacity -= 1;
      await existingOccupation.save();
    }

    res.status(201).send(newReservation);
  } catch (err) {
    res.status(400).send(error.message);
  }
};

exports.deleteReservations= async (req, res) => {
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
}