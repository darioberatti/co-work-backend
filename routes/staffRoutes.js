const express = require("express");
const router = express.Router();
const {
  listUsers,
  getUserById,
  addUser,
  editUser,
  setPassword,
} = require("../controllers/staffController");
const { validateUser, validateStaffOrAdmin } = require("../middleware/auth");

//Ruta para listar todos los usuarios.
router.get("/users", validateUser, validateStaffOrAdmin, listUsers);

//Ruta para ver el detalle de un usuario.
router.get("/users/:userId", validateUser, validateStaffOrAdmin, getUserById);

//Ruta para crear un usuario.
router.post("/users", validateUser, validateStaffOrAdmin, addUser);

//Ruta para editar cualquier campo del usuario.
router.put("/users/:userId", validateUser, validateStaffOrAdmin, editUser);

//Ruta para que el usuario genere su password.
router.post("/users/set-password", setPassword);

module.exports = router;
