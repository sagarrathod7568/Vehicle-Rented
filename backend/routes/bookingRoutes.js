const express = require("express");
const router = express.Router();
const { bookVehicle } = require("../controllers/bookingController");

// Book a vehicle
router.post("/", bookVehicle);

module.exports = router;
