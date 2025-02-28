const mongoose= require("mongoose");
const Booking = require("../models/Booking");

const getBookingDetailsController = async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID format",
      });
    }
    const ticketExists = await Booking.findOne({ _id: bookingId });
    if (!ticketExists) {
      return res.status(400).json({
        success: false,
        message: "No ticket is booked with this id",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Ticket against this id found!",
        data: ticketExists,
      });
    }
  } catch (error) {
    console.error("Error while fetching a ticket:", error);
    return res.status(500).json({
      success: false,
      message: "Server failed while fetching tickets",
    });
  }
};

module.exports = getBookingDetailsController;
