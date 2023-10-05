const { Occupancy } = require("../service/occupationServices");


exports.listOccupations = async (req, res, next) => {
  try {
    const response = await Occupancy.showAll();
    res.status(200).send(response);
  } catch (error) {
    next(error)
  }
};

