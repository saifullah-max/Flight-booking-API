const dotenv = require("dotenv").config();
const express = require("express");
const connectToMongoDB = require("./config/db");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/authRouter");
const flightRoutes = require("./routes/flightRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());

connectToMongoDB(true);
app.get("/test", (req, res) => {
  res.send("Test route");
});
app.use("/auth", authRouter);
app.use("/api", flightRoutes);
app.use("/api", bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
