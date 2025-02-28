const express = require("express");
const fetchAllFlightController = require("../controllers/fetchAllFlightController");
const fetchSpecificFlightController = require("../controllers/fetchSpecificFlightController");
const router = express.Router();

router.get("/flights", fetchAllFlightController);
router.get("/flights/:flightNumber", fetchSpecificFlightController);

module.exports = router;
