const dotenv = require("dotenv");
dotenv.config();
const { Staff } = require("../service/staffServices");
const { generateToken, validateToken } = require("../config/tokens");
const { sendEmail } = require("../config/repositories/mailer");

exports.listUsers = async (req, res, next) => {
  try {
    const result = await Staff.showAll();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const result = await Staff.showByPk(userId);

    if (!result) return res.status(400).send("Usuario no encontrado");

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.addUser = async (req, res, next) => {
  const { name, lastName, DNI, birth, email, course } = req.body;

  try {
    if (!name || !lastName || !DNI || !birth || !email || !course) {
      return res.status(400).send("Todos los campos son requeridos");
    }

    const result = await Staff.add(name, lastName, DNI, birth, email, course);
    const payload = { userId: result.id, email: result.email };
    const registerToken = generateToken(payload);

    sendEmail(payload.email, registerToken);

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

exports.editUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const result = await Staff.edit(userId, req.body);
    if (!result) return res.status(400).send("Usuario no encontrado");
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.setPassword = async (req, res, next) => {
  //La password llega con el string solamente
  const { registerToken, password } = req.body;

  try {
    const decoded = validateToken(registerToken);

    const { userId } = decoded.payload;

    const userData = { password: password, status: "enabled" };

    const result = await Staff.edit(userId, userData);

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.searchResults = async (req, res, next) => {
  try {
    const { name } = req.params;
    const response = await Staff.getSearchedUsers(name);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};
