const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/SendEmail");
const crypto = require("crypto");
const Token = require("../models/Token");

const authSignupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Enter all fields" });
    }

    const existingUser = await User.findOne({ email }).select("email");
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email address",
        redirect: "/login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 13);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = await Token.create({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    const url = `${process.env.BASE_URL}auth/${newUser._id}/verify/${token.token}`;
    console.log("Sending email to:", newUser.email);
    await sendEmail(
      newUser.email,
      "Verify Email",
      `Click here to verify:${url}`
    );
    console.log("Email sent successfully!");

    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log("Error while signing up the user");
    return;
  }
};

module.exports = authSignupController;
