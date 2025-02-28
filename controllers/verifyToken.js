const User = require("../models/User");
const Token = require("../models/Token");

const verifyToken = async (req, res) => {
  try {
    const { id, token } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "Invalid link" });
    }
    const storedToken = await Token.findOne({ userId: id, token });
    if (!storedToken) {
      return res.status(400).json({ message: "Invalid link or token expired" });
    }
    user.verified = true;
    await user.save();
    await storedToken.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Email Verified successfully",
    });
  } catch (error) {
    console.error("Verification Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server failed while verifying email account",
    });
  }
};

module.exports = verifyToken
