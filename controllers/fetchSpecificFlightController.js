const flight = require("../models/Flight");

const fetchSpecificFlightController = async (req, res) => {
  try {
    const { flightNumber } = req.params;

    const flightNumberFromDB = await flight.findOne({ flightNumber });
    if (!flightNumberFromDB) {
      return res.status(404).json({
        success: false,
        message: "Flight with this number not found!"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Flight found",
      data: flightNumberFromDB
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server failed!",
    });
  }
};

module.exports = fetchSpecificFlightController;
