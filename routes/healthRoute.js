const express = require("express");
const router = express.Router();
const { healthStatus } = require("../controllers/healthController");

router.get("/", healthStatus);

module.exports = router;
