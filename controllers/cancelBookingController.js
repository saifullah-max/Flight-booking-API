const Flight = require("../models/Flight");
const Booking = require("../models/Booking");

const cancelBookingController = async (req, res) => {
  try {
    const { flightId } = req.params;

    const flight = await Flight.findOne({ _id: flightId });
    
    if (!flight) {
        return res.status(404).json({
            success: false,
            message: "No record found, Please enter valid Flight ID",
        });
    }

    const deleteBooking = await Booking.findOneAndDelete({ flight: flightId });

    if (!deleteBooking) {
        return res.status(404).json({ success: false, message: "Booking not found!" });
      }

    const updateSeats = await Flight.findOneAndUpdate(
      { _id: flightId },
      { $inc: { availableSeats: +deleteBooking.numberOfSeatsBooked } }
    );

    if (deleteBooking) {
      return res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Error while cancelling the request",
      });
    }
  } catch (error) {
    console.error("Error while cancelling booking", error.message);
    return res.status(500).json({
      success: false,
      message: "Server failed while cancelling the booking",
    });
  }
};

module.exports = cancelBookingController;
