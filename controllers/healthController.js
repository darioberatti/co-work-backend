exports.healthStatus = (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send("Health Check Failed: ", error);
  }
};
