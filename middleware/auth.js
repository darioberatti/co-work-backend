const { validateToken } = require("../config/tokens")

function validateUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
      return res.status(401).send("Token no encontrado");
  }

  const { payload } = validateToken(token);
  req.user = {
      userId: payload.userId,
      ...payload
  };

//   console.log("PAYLOAD AUTH ---> ", payload)
//   console.log("REQ.USER ----> ", req.user)
  
  if (payload) {
      return next();
  } else {
      return res.status(401).send("Token invalido");
  }
}

module.exports = {validateUser}