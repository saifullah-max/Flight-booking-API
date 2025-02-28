const express = require("express");
const bookFlightController = require("../controllers/bookFlightController");
const getBookingDetailsController = require("../controllers/getBookingDetailsController");
const getAllBookingControllers = require("../controllers/getAllBookingController");
const cancelBookingController = require("../controllers/cancelBookingController");
const router = express.Router();

router.post("/booking", bookFlightController);
router.get("/booking/:bookingId", getBookingDetailsController);
router.get("/booking/user/:userId", getAllBookingControllers);
router.put("/booking/:flightId/cancel", cancelBookingController);

module.exports = router;
