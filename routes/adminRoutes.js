const express = require("express");
const router = express.Router();
const { listOffices, getOfficeById, addOffice, editOffice } = require("../controllers/adminController");

// Ruta para listar todas las oficinas.
router.get("/offices", listOffices);

//Ruta para ver el detalle de una oficina.
router.get("/offices/:officeId", getOfficeById);

//Ruta para agregar una nueva oficina.
router.post("/offices", addOffice)

//Ruta para editar cualquier campo de la oficina.
router.put("/offices/:officeId", editOffice)

module.exports = router;
