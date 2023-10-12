const { User } = require("../service/userServices");
const { generateToken } = require("../config/tokens");
const { resetPasswordEmail } = require("../config/repositories/mailer");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);

    if (!user) return res.status(401).send("Credenciales inválidas");
    if (user.status === "disabled")
      return res
        .status(401)
        .send(
          "Usuario deshabilitado. Contactese con nosotros para revisar su situación."
        );

    const isValid = await User.validateUserPassword(user, password);
    if (!isValid) return res.status(401).send("Credenciales inválidas");

    const payload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      DNI: user.DNI,
      age: user.age,
      course: user.course,
      status: user.status,
      roleId: user.roleId,
      role: user.role.name,
    };

    const token = generateToken(payload);

    res.cookie("token", token, { sameSite: "none", secure: true }); //Configuración de cookie para el deploy

    res.send(payload);
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204).end();
};

exports.persistence = (req, res) => {
  res.send(req.user);
};

exports.resetPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    if (!email) return res.status(400).send("Campo email es requerido");

    const user = await User.findByEmail(email);

    const payload = { userId: user.id, email: user.email };

    const resetToken = generateToken(payload);

    resetPasswordEmail(payload.email, resetToken);

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
