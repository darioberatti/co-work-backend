const { Admin } = require("../service/adminServices");
const Tables = require("../models/Tables");
const Floors = require("../models/Floors");

exports.listOffices = async (req, res) => {
  try {
    const result = await Admin.showAll();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getOfficeById = async (req, res) => {
  const { officeId } = req.params;
  try {
    const result = await Admin.showByPk(officeId);
    if (!result) return res.status(400).send("Oficina no encontrada");
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.addOffice = async (req, res) => {
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

    const floorsPromises = [];
    for (let i = 1; i <= floorsNumber; i++) {
      const floor = await Floors.create({
        number: i,
        tablesNumber: 1,
      });

      const tablePromises = [];
      for (let j = 1; j <= floor.tablesNumber; j++) {
        tablePromises.push(
          Tables.create({
            name: `Floor ${i} - Table A`,
            floor: floor.number,
            capacity: 6,
          })
        );
      }

      const createdTables = await Promise.all(tablePromises);
      await floor.addTables(createdTables);

      await result.addFloors(floor);

      floorsPromises.push(floor);
    }

    await result.addFloors(floorsPromises);

    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }

  exports.editOffice = async (req, res) => {
    const { officeId } = req.params;
  
    try {
      const result = await Admin.edit(officeId, req.body);
      if (!result) return res.status(400).send("Usuario no encontrado");
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  };
};
