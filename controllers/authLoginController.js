const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all credentials",
      });
    }

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "User not found, please sign-in first",
        redirect: "/signup",
      });
    }
    const passwordMatch = await bcrypt.compare(password, userExists.password);

    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
        redirect: "/login",
      });
    }

    if (!userExists.verified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your account first!",
      });
    }
    const token = jwt.sign(
      { _id: userExists._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_TIMEOUT || "12h",
      }
    );
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      redirect: "/",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server failed, please try again later!",
    });
  }
};

module.exports = authLoginController;
