const express = require("express");
const router = express.Router();
const { listOffices, getOfficeById, addOffice, editOffice, editTableCapacity } = require("../controllers/adminController");
const { validateUser, validateAdmin } = require("../middleware/auth");

// Ruta para listar todas las oficinas.
router.get("/offices",validateUser, listOffices);

//Ruta para ver el detalle de una oficina.
router.get("/offices/:officeId", validateUser, getOfficeById);

//Ruta para agregar una nueva oficina.
router.post("/offices",validateUser,validateAdmin, addOffice)

//Ruta para editar cualquier campo de la oficina.
router.put("/offices/:officeId", validateUser, validateAdmin, editOffice)

// Ruta para editar la capacidad de una mesa.
router.put("/offices/:officeId/tables/:tableId", validateUser, validateAdmin, editTableCapacity);

module.exports = router;
