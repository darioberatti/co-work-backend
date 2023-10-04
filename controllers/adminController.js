const { Admin } = require("../service/adminServices");
const { Tables } = require("../models");

exports.listOffices = async (req, res, next) => {
  try {
    const result = await Admin.showAll();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.getOfficeById = async (req, res, next) => {
  const { officeId } = req.params;
  try {
    const result = await Admin.showByPk(officeId);
    if (!result) return res.status(400).send("Oficina no encontrada");
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.addOffice = async (req, res, next) => {
  const {
    name,
    address,
    city,
    province,
    country,
    openingTime,
    closingTime,
    floorsNumber,
    phoneNumber,
    urlImg,
  } = req.body;

  try {
    if (!name || !address || !city || !country || !floorsNumber) {
      return res.status(400).send("Todos los campos son requeridos");
    }

    const result = await Admin.add(
      name,
      address,
      city,
      province,
      country,
      openingTime,
      closingTime,
      floorsNumber,
      phoneNumber,
      urlImg
    );

    // const finalResult = Admin.relation(result, floorsNumber);

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

exports.editOffice = async (req, res, next) => {
  const { officeId } = req.params;

  try {
    const result = await Admin.edit(officeId, req.body);
    if (!result) return res.status(400).send("Usuario no encontrado");
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.editTableCapacity = async (req, res, next) => {
  const { tableId } = req.params;
  const { capacity } = req.body;

  try {
    const table = await Tables.findByPk(tableId);

    if (!table) {
      return res.status(404).send("Mesa no encontrada");
    }

    await table.update({ capacity }, { returning: true });

    res.status(200).send("Capacidad de la mesa actualizada exitosamente");
  } catch (error) {
    next(error);
  }
};

exports.addTable = async (req, res) => {
  const { officeId } = req.params;
  const { name, floor, capacity } = req.body;
  try {
    const exists = await Tables.findAll({
      where: { name: name, officeId: officeId },
    });
    if (exists[0]) return res.status(400).send("Esta mesa ya existe");
    const result = await Admin.createTable(name, floor, capacity, officeId);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteTable = async (req, res) => {
  const { officeId, tableId } = req.params;
  try {
    const deletedTable = await Admin.destroyTable(tableId);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getTables = async (req, res) => {
  const { officeId } = req.params;
  try {
    const officesTables = await Admin.getOfficesTables(officeId);
    res.status(200).send(officesTables);
  } catch (error) {
    res.status(400).send(error);
  }
};
