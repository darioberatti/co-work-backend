const express = require("express");
const router = express.Router();
const adminRoutes = require("./adminRoutes");
const staffRoutes = require("./staffRoutes");
const userRoute = require("./userRoutes");
const bookingRoutes = require("./bookingRoutes")

router.use("/admin", adminRoutes);
router.use("/staff", staffRoutes);
router.use("/user", userRoute);
router.use("/booking", bookingRoutes)

module.exports = router;
