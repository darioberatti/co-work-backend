const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "milanesa";

function generateToken(payload) {
  const token = jwt.sign({ payload }, SECRET, {
    expiresIn: "2d",
  });
  return token;
}

function validateToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generateToken, validateToken };
