const express = require("express");
const authSignupController = require("../controllers/authSignupController");
const authLoginController = require("../controllers/authLoginController");
const verifyToken = require("../controllers/verifyToken");
const router = express.Router();

router.get("/test", async (req, res) => {
  res.send("Test route from auth");
});

router.post("/signup", authSignupController);
router.get("/:id/verify/:token", verifyToken);
router.post("/login", authLoginController);

module.exports = router;
