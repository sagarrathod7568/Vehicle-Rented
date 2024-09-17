const Vehicle = require("../models/Vehicle");

// Book a vehicle
const bookVehicle = async (req, res) => {
  try {
    const { model, startDate, endDate } = req.body;
    const vehicle = await Vehicle.findOne({ model });

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    if (!vehicle.available) {
      return res
        .status(400)
        .json({ message: "Vehicle already booked for the selected dates" });
    }

    vehicle.available = false;
    vehicle.bookings.push({ startDate, endDate });
    await vehicle.save();
    res.json({ message: "Booking successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { bookVehicle };
