const dotenv = require("dotenv");
dotenv.config();
const { Staff } = require("../service/staffServices");
const { generateToken, validateToken } = require("../config/tokens");
const transporter = require("../config/mailer");

exports.listUsers = async (req, res) => {
  try {
    const result = await Staff.showAll();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await Staff.showByPk(userId);

    if (!result) return res.status(400).send("Usuario no encontrado");

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.addUser = async (req, res) => {
  const { name, lastName, DNI, age, email, course } = req.body;
  const originUrl = process.env.ORIGIN;

  try {
    if (!name || !lastName || !DNI || !age || !email || !course) {
      return res.status(400).send("Todos los campos son requeridos");
    }

    const result = await Staff.add(name, lastName, DNI, age, email, course);
    const payload = { userId: result.id, email: result.email };
    const registerToken = generateToken(payload);

    // console.log("REGISTERTOKEN ---> ", registerToken)

    transporter.sendMail({
      from: '"Retro Futbol Club" <e.retrofutbolclub@gmail.com>', // sender address
      to: payload.email, // list of receivers
      subject: "Confirmacion de registro de usuario", // Subject line
      html: `<h2>Hola ${payload.email}! Tu usuario fué dado de alta en Co-Work P5!</h2>
            <h3>Para completar tu registro debes ingresar al siguiente link y establecer tu contraseña:</h3>
            <h3><a href=${originUrl}/confirm-user/${registerToken}>Redirigir al sitio</a></h3>
            <h4><b>Muchisimas gracias!</b></h4>`,
    });
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.editUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await Staff.edit(req.body, userId);
    if (!result) return res.status(400).send("Usuario no encontrado");
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.setPassword = async (req, res) => {
  //La password llega con el string solamente
  const { registerToken, password } = req.body;

  try {
    const decoded = validateToken(registerToken);
    const { userId } = decoded.payload;

    const userData = { password: password, status: "enabled" };

    const result = await Staff.edit(userData, userId);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};
