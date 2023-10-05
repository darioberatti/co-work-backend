const express = require("express");
const router = express.Router();
const adminRoutes = require("./adminRoutes");
const staffRoutes = require("./staffRoutes");
const userRoute = require("./userRoutes");
const bookingRoutes = require("./bookingRoutes")
const occupationRoutes = require("./occupationRoutes")

router.use("/admin", adminRoutes);
router.use("/staff", staffRoutes);
router.use("/user", userRoute);
router.use("/booking", bookingRoutes)
router.use("/occupation", occupationRoutes)

module.exports = router;
