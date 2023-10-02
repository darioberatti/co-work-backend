const { Admin } = require("../service/adminServices");

exports.listOffices = async (req, res) => {
  try {
    const result = await Admin.showAll();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getOfficeById = async (req, res) => {
  const { officeId } = req.params;
  try {
    const result = await Admin.showByPk(officeId);
    if (!result) return res.status(400).send("Oficina no encontrada");
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
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

    const finalResult = Admin.relation(result, floorsNumber);

    res.status(201).send(finalResult);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.editOffice = async (req, res) => {
  const { officeId } = req.params;

  try {
    const result = await Admin.edit(officeId, req.body);
    if (!result) return res.status(400).send("Usuario no encontrado");
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
