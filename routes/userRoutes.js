const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  persistencia,
  resetPassword,
} = require("../controllers/userController");
const { validateUser } = require("../middleware/auth");

// Ruta para Login
router.post("/login", login);

// Ruta para Logout
router.post("/logout", validateUser, logout);

// Ruta Me y Persistencia
router.get("/me", validateUser, persistencia);

// Ruta para resetear contraseña
router.post("/reset-password", resetPassword);

module.exports = router;
