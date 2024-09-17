const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  type: String,
  model: String,
  wheels: Number,
  available: { type: Boolean, default: true },
  bookings: [
    {
      startDate: Date,
      endDate: Date,
    },
  ],
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
