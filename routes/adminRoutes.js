const express = require("express");
const router = express.Router();
const { listOffices, getOfficeById, addOffice, editOffice, editTableCapacity } = require("../controllers/adminController");

// Ruta para listar todas las oficinas.
router.get("/offices", listOffices);

//Ruta para ver el detalle de una oficina.
router.get("/offices/:officeId", getOfficeById);

//Ruta para agregar una nueva oficina.
router.post("/offices", addOffice)

//Ruta para editar cualquier campo de la oficina.
router.put("/offices/:officeId", editOffice)

// Ruta para editar la capacidad de una mesa.
router.put("/offices/:officeId/tables/:tableId", editTableCapacity);

module.exports = router;
