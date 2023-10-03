const { validateToken } = require("../config/tokens");

function validateUser(req, res, next) {
  // const token = req.cookies.token;
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("Token no encontrado");
  }
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.sendStatus(401);
  }

  if (!token) {
    return res.status(401).send("Token no encontrado");
  }

  const { payload } = validateToken(token);
  req.user = {
    userId: payload.userId,
    ...payload,
  };


  if (payload) {
    return next();
  } else {
    return res.status(401).send("Token invalido");
  }
}

function validateStaffOrAdmin(req, res, next) {
  const role = req.user.role;
  if (role === "staff" || role === "admin") {
    return next();
  }
  res.sendStatus(401);
}

function validateAdmin(req, res, next) {
  const role = req.user.role;
  if (role === "admin") {
    return next();
  }
  res.sendStatus(401);
}

module.exports = { validateUser, validateStaffOrAdmin, validateAdmin };
