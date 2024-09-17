const Vehicle = require("../models/Vehicle");

// Get vehicle types based on number of wheels
const getVehicleTypes = async (req, res) => {
  try {
    const wheels = parseInt(req.params.wheels);
    const vehicles = await Vehicle.find({ wheels });
    const types = [...new Set(vehicles.map((vehicle) => vehicle.type))];
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get vehicle models based on type
const getVehicleModels = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ type: req.params.type });
    res.json(vehicles.map((vehicle) => vehicle.model));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getVehicleTypes, getVehicleModels };
