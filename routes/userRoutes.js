const express = require("express");
const router = express.Router();
const { login, logout, persistencia } = require("../controllers/userController");
const { validateUser } = require("../middleware/auth");

// Ruta para Login
router.post("/login", login);

// Ruta para Logout
router.post("/logout", logout);

// Ruta Me y Persistencia
router.get("/me", validateUser, persistencia);

module.exports = router;
