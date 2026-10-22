
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: false,
      message: "Authorization token required",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findById(decoded.userid);

    if (!user || user.activeTokenHash !== tokenHash) {
      return res.status(401).json({
        status: false,
        message: "Session expired. Please login again.",
      });
    }

    req.user = decoded.userid;
    req.userRole = user.role;
    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
