const express = require("express");
const router = express.Router();
const {
  getVehicleTypes,
  getVehicleModels,
} = require("../controllers/vehicleController");

// Get vehicle types based on number of wheels
router.get("/:wheels", getVehicleTypes);

// Get vehicle models based on type
router.get("/models/:type", getVehicleModels);

module.exports = router;
