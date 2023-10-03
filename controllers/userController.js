const { User } = require("../service/userServices");
const { generateToken } = require("../config/tokens");
const { resetPasswordEmail } = require("../config/repositories/mailer");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    // console.log("USER ----> ", user.role.name)
    if (!user) return res.status(401).send("Credenciales inválidas");
    if (user.status === "disabled")
      return res
        .status(401)
        .send(
          "Usuario deshabilitado. Contactese con nosotros para revisar su situación."
        );

    const isValid = await User.validateUserPassword(user, password);
    // console.log("isValid ----> ", isValid)
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
    // console.log("PAYLOAD ----> ", payload)

    const token = generateToken(payload);
    // console.log("TOKEN ----> ", token)

    res.cookie("token", token);
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
  // console.log("resetPassword -- req.body ---> ", req.body);

  try {
    if (!email) return res.status(400).send("Campo email es requerido");

    const user = await User.findByEmail(email);
    // console.log("resetPassword -- user ---> ", user);

    const payload = { userId: user.id, email: user.email };
    // console.log("resetPassword -- payload ---> ", payload);

    const resetToken = generateToken(payload);
    // console.log("resetPassword -- resetToken ---> ", resetToken);

    resetPasswordEmail(payload.email, resetToken);

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
