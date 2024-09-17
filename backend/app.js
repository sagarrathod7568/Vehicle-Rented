const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const vehicleRoutes = require("./routes/vehicleRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// Connect to database
connectDB();

app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use("/vehicles", vehicleRoutes);
app.use("/book", bookingRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
