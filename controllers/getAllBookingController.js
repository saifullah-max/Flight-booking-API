const User = require("../models/User");
const Bookings = require("../models/Booking");

const getAllBookingControllers = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ email: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with provided email id",
      });
    }
    const userEmail = user.email;
    const bookings = await Bookings.find({ passengerEmail: userEmail });
    console.log(bookings);
    if (bookings.length === 0) {
      console.log(bookings);
      return res.status(404).json({
        success: false,
        message: "No bookings made with this email id",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All bookings made against provided email address fetched!",
      data: bookings,
    });
  } catch (error) {
    console.error("Error while getting all bookings", error.message);
    return res.status(500).json({
      success: false,
      message: "Server failed while fetching user's booking",
    });
  }
};

module.exports = getAllBookingControllers;
