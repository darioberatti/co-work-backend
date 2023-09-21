const express = require("express");
const router = express.Router();
const { listUsers, getUserById, addUser, editUser, setPassword } = require("../controllers/staffController");

//Ruta para listar todos los usuarios.
router.get("/users", listUsers);

//Ruta para ver el detalle de un usuario.
router.get("/users/:userId", getUserById);

//Ruta para crear un usuario.
router.post("/users/add", addUser)

//Ruta para editar cualquier campo del usuario.
router.put("/users/edit/:userId", editUser)

router.post("/users/set-password", setPassword)

module.exports = router;