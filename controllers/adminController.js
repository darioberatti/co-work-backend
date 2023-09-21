const { Admin } = require("../service/adminServices");

exports.listOffices = async (req, res) => {
  try {
    const result = await Admin.showAll();
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

//Si buscamos un ID que no existe, devuelve un 200 OK
exports.getOfficeById = async (req, res) => {
  const { officeId } = req.params;
  try {
    const result = await Admin.showByPk(officeId);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.addOffice = async (req, res) => {
  const {
    name,
    address,
    city,
    country,
    openingTime,
    closingTime,
    floors,
    phoneNumber,
  } = req.body;

  try {
    const result = await Admin.add(
      name,
      address,
      city,
      country,
      openingTime,
      closingTime,
      floors,
      phoneNumber
    );
    res.send(result)
  } catch (error) {
    res.status(400).send(error);
  }
};
