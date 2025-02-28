const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  },
  passengerName: {
    type: String,
    required: true,
  },
  passengerEmail: {
    type: String,
    required: true,
  },
  numberOfSeatsBooked: {
    type: Number,
    required: true,
    min: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Paid", // bcz No payment method is integrated, that's why I set it to PAID by default
  },
});

module.exports = mongoose.model("Booking", bookingSchema, "Booking");
