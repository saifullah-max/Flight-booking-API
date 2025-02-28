const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  airlineName: {
    type: String,
    required: true,
  },
  flightNumber: {
    type: String,
    unique: true,
    required: true,
  },
  departureCity: {
    type: String,
    required: true,
  },
  arrivalCity: {
    type: String,
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 0,
  },
  flightStatus: {
    type: String,
    enum: ["On time", "Delayed", "Cancelled"],
    default: "On time",
  },
});

module.exports = mongoose.model("Flight", flightSchema, "Flight");
