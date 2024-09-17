const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Vehicle = require("./models/Vehicle");
const connectDB = require("./config/db"); // Ensure this path is correct

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

app.get("/vehicles/:wheels", async (req, res) => {
  try {
    const wheels = parseInt(req.params.wheels);
    const vehicles = await Vehicle.find({ wheels });
    const types = [...new Set(vehicles.map((vehicle) => vehicle.type))];
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/models/:type", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ type: req.params.type });
    res.json(vehicles.map((vehicle) => vehicle.model));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/book", async (req, res) => {
  try {
    const { model, startDate, endDate } = req.body;
    const vehicle = await Vehicle.findOne({ model });

    if (!vehicle.available) {
      return res
        .status(400)
        .json({ message: "Vehicle already booked for the selected dates" });
    }

    vehicle.available = false;
    await vehicle.save();
    res.json({ message: "Booking successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
