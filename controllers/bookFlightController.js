const express = require("express");
const User = require("../models/User");
const Flight = require("../models/Flight");
const Booking = require("../models/Booking");

const bookFlightController = async (req, res) => {
  try {
    const { passengerName, passengerEmail, seatsBooked, flightNumber } =
      req.body;

    const [isUserLoggedIn, isFlightAvailable] = await Promise.all([
      User.findOne({ email: passengerEmail }).select("email"),
      Flight.findOne({ flightNumber }),
    ]);

    // const isUserLoggedIn = await User.findOne({ email: passengerEmail }).select("email");
    if (!isUserLoggedIn) {
      return res.status(400).json({
        success: false,
        message: "Please first log in with the same email address",
        redirect: "/login",
      });
    }

    // let isFlightAvailable = await Flight.findOne({ flightNumber }).select("flightNumber");
    if (!isFlightAvailable) {
      return res.status(400).json({
        success: false,
        message: "Requested flight is not available",
      });
    }
    const availableSeats = isFlightAvailable.availableSeats;

    if (seatsBooked <= 0 || seatsBooked > availableSeats) {
      return res.status(400).json({
        success: false,
        message:
          seatsBooked <= 0
            ? "Please book at least 1 seat"
            : "Not enough seats available",
      });
    }
    const totalPrice = isFlightAvailable.price * seatsBooked;

    const updatedFlight = await Flight.findOneAndUpdate(
      { _id: isFlightAvailable._id, availableSeats: { $gte: seatsBooked } },
      { $inc: { availableSeats: -seatsBooked } }
    );

    if (!updatedFlight) {
      return res.status(400).json({
        success: false,
        message: "Seats no longer available, try booking another Flight tickt",
      });
    }

    const booking = await Booking.create({
      user: isUserLoggedIn._id,
      flight: isFlightAvailable._id,
      passengerName,
      passengerEmail,
      numberOfSeatsBooked: seatsBooked,
      paymentStatus: "Paid",
      totalPrice,
    });

    return res.status(200).json({
      success: true,
      message: "Your seats have been booked!",
      data: booking,
    });
  } catch (error) {
    console.error("Bookiing error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server failed while booking tickets, please try again!",
    });
  }
};

module.exports = bookFlightController;
