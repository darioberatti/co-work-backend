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

  try {
    if (!name || !lastName || !DNI || !age || !email || !course) {
      return res.status(400).send("Todos los campos son requeridos");
    }

    const result = await Staff.add(name, lastName, DNI, age, email, course);
    const payload = { userId: result.id, email: result.email };
    const registerToken = generateToken(payload);

    transporter.sendMail({
      from: '"Retro Futbol Club" <e.retrofutbolclub@gmail.com>', // sender address
      to: payload.email, // list of receivers
      subject: "Confirmacion de registro de usuario", // Subject line
      html: `<h2>Hola ${payload.email}! Tu usuario se registro con éxito</h2>
            <a href=http://localhost:3000/confirm-user/${registerToken}>Redirigir al sitio:</a>
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
