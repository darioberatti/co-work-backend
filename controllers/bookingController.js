const e = require("express");
const { Tables, Occupation, Bookings } = require("../models");
const { Book } = require("../service/bookingServices");
const { Admin } = require("../service/adminServices");
const { Staff } = require("../service/staffServices")
const {
  newBookingConfirmationEmail, reservationCancellationToOfficeClosureEmail
} = require("../config/repositories/mailer");


exports.listReservations = async (req, res, next) => {
  try {
    const response = await Book.showAll();
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

exports.listUserReservations = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const response = await Book.showByPk(userId);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

exports.addReservation = async (req, res, next) => {
  try {
    const reservationData = req.body;
    const { userId, email, name } = req.user;

    //Le asignamos la reserva al usuario
    reservationData.userId = userId;

    //Buscamos la mesa de la reserva
    const table = await Book.getTable(reservationData.tableId);

    //Buscamos la ocupacion de la mesa en el dia y turno solicitados

    const existingOccupation = await Book.getExistingOccupation(
      reservationData.tableId,
      reservationData.day,
      reservationData.shift
    );

    //Si la capacidad actual es 0, no se puede reservar
    if (existingOccupation && existingOccupation.actualCapacity === 0) {
      return res.status(400).send("No hay lugares disponibles");
    }

    //Si no existe ocupacion, se crea una con la fecha, mesa, turno, capacidad maxima y actual
    if (!existingOccupation) {
      const newOccupation = await Book.createOccupation(
        reservationData.day,
        reservationData.shift,
        reservationData.tableId,
        table.capacity
      );
    }

    //Creamos la nueva reserva
    const newReservation = await Book.addReservation(reservationData);

    //Si existe la ocupacion, le restamos uno a la capacidad actual
    if (existingOccupation) {
      existingOccupation.actualCapacity -= 1;
      await existingOccupation.save();
    }

    const office = await Admin.showByPk(table.officeId);

    newBookingConfirmationEmail(email, name, newReservation, table, office);

    res.status(201).send(newReservation);
  } catch (error) {
    next(error);
  }
};

exports.deleteReservations = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedReservation = await Book.findBooking(id);

    const user = await Staff.showByPk(deletedReservation.userId);

    const table = await Book.getTable(deletedReservation.tableId);

    const office = await Admin.showByPk(table.officeId);

    reservationCancellationToOfficeClosureEmail(user, deletedReservation, office);

    const existingOccupation = await Book.getExistingOccupation(
      deletedReservation.tableId,
      deletedReservation.day,
      deletedReservation.shift
    );

    existingOccupation.actualCapacity = existingOccupation.maxCapacity;
    await existingOccupation.save();

    const deleted = await Book.deleteReservation(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

exports.editReservations = async (req, res, next) => {
  const { id } = req.params;

  try {
    const canceledReservation = await Book.editReservation(id, req.body);
    if (!canceledReservation) return res.status(400).send("Reserva no encontrada");
    
    const existingOccupation = await Book.getExistingOccupation(
      canceledReservation.tableId,
      canceledReservation.day,
      canceledReservation.shift
    );

    existingOccupation.actualCapacity += 1;
    await existingOccupation.save();

    res.status(200).send(canceledReservation);
  } catch (error) {
    next(error);
  }
};
