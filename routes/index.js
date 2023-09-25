const express = require("express");
const router = express.Router();
const adminRoutes = require("./adminRoutes");
const staffRoutes = require("./staffRoutes");
const healthRoute = require("./healthRoute");

router.use("/admin", adminRoutes);
router.use("/staff", staffRoutes);
router.use("/health", healthRoute);

module.exports = router;
