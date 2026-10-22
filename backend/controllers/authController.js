const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const generateToken = require("../utils/generateToken");



const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });

    if (!userData) {
      return res.status(400).json({
        status: false,
        message: "User Not Found",
      });
    }

    const comparePassword = await bcrypt.compare(password, userData.password);

    if (!comparePassword) {
      return res.status(401).json({
        status: false,
        message: "Incorrect userName or Password",
      });
    }

    const token = generateToken(userData._id);

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    userData.activeTokenHash = tokenHash;
    userData.isOnline = true;
    userData.lastLogin = new Date();
    await userData.save();

    const safeUser = userData.toObject();
    delete safeUser.password;
    delete safeUser.activeTokenHash;

    return res.status(200).json({
      status: true,
      message: "Login Successfully",
      user: safeUser,
      token,
    });
  } catch (error) {
    console.log("Login Failed", error.message);

    return res.status(500).json({
      status: false,
      message: "Login Failed",
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const userData = await User.findById(req.user).select(
      "-password -activeTokenHash",
    );

    if (!userData) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Current user found",
      userData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to fetch current user",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOneAndUpdate(
      {
        _id: req.user,
        activeTokenHash: tokenHash,
      },
      {
        $set: {
          activeTokenHash: null,
          isOnline: false,
        },
      },
      { returnDocument: "after" },
    );

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Session already expired",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log("Logout Failed", error.message);

    return res.status(500).json({
      status: false,
      message: "Logout failed",
    });
  }
};

module.exports = {
 
  userLogin,
  getCurrentUser,
  logoutUser,
};
