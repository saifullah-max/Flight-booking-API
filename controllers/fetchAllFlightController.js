const express = require("express");
const Flight = require("../models/Flight");

const fetchAllFlightController = async (req, res) => {
  try {
    const { departureCity, arrivalCity, departureTime } = req.query;

    if (!Object.keys(req.query).length) {
      const flights = await Flight.find({});
      return res.status(200).json({
        success: true,
        message: "All flights fetched successfully",
        data: flights,
      });
    }

    const filters = {};

    if (departureCity) filters.departureCity = new RegExp(departureCity, "i");
    if (arrivalCity) filters.arrivalCity = new RegExp(arrivalCity, "i");

    if (departureTime) {
      const regex = /^\d{2}-\d{2}-\d{4}$/;
      if (!regex.test(departureTime)) {
        return res.status(400).json({
          success: false,
          message: "Invalid departureTime format. Use DD-MM-YYYY",
        });
      }

      const [day, month, year] = departureTime.split("-");
      const formattedDate = `${year}-${month}-${day}`;
      const date = new Date(formattedDate);

      if (isNaN(date.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid date",
        });
      }
      
      const utcDayStart = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0));
      const utcDayEnd = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59));

      filters.departureTime = { $gte: utcDayStart.toISOString(), $lt: utcDayEnd.toISOString() };
    }

    const flights = await Flight.find(filters);

    return res.status(200).json({
      success: true,
      message: flights.length ? "Flights fetched successfully" : "No flights found for the applied filters!",
      data: flights.length ? flights : undefined,
    });
  } catch (error) {
    console.error("Error fetching flights:", error);
    return res.status(500).json({
      success: false,
      message: "Server failed",
    });
  }
};

module.exports = fetchAllFlightController;