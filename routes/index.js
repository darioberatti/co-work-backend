const express = require("express");
const router = express.Router();
const adminRoutes = require("./adminRoutes");
const staffRoutes = require("./staffRoutes");
const userRoute = require("./userRoutes");

router.use("/admin", adminRoutes);
router.use("/staff", staffRoutes);
router.use("/user", userRoute);

module.exports = router;
