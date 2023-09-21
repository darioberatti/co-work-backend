const { Staff } = require("../service/staffServices");
const { generateToken, validateToken } = require("../config/tokens");

exports.listUsers = async (req, res) => {
  try {
    const result = await Staff.showAll();
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await Staff.showByPk(userId);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.addUser = async (req, res) => {
  const { name, lastName, DNI, age, email, course } = req.body;

  try {
    const result = await Staff.add(name, lastName, DNI, age, email, course);
    const payload = { userId: result.id, email: result.email };
    const registerToken = generateToken(payload);

    //Acá debería ir la lógica para mandar el token por email.
    console.log(registerToken);

    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.editUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await Staff.edit(userId, req.body);
    res.send(result);
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
    //Convertimos la password en un objeto para que matchee con el modelo
    const userData = { password: password, status: "enabled" };

    // console.log("USER ID >>>>", userId);
    // console.log("PASSWORD >>>", password);

    // console.log("PASSWORD DECODED >>>", decoded);
    // PASSWORD DECODED >>> {
    //   payload: { userId: 4, email: 'user3@gmail.com' },
    //   iat: 1695318698,
    //   exp: 1695491498
    // }

    const result = await Staff.edit(userId, userData);

    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};
