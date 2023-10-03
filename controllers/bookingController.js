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
  const  userId  = req.params.id;
  try {
    const response = await Book.showByPk(userId);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.addReservation = async (req, res) => {
  const reservationData = req.body
  const {userId} = req.user
  try {
    const response = await Book.add(userId, reservationData);
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
