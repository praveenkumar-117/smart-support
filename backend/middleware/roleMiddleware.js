const User = require("../models/User");

const roleMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          status: false,
          message: "Authentication required",
        });
      }

      const user = await User.findById(req.user).select("role");

      if (!user) {
        return res.status(401).json({
          status: false,
          message: "User not found",
        });
      }

      if (user.role !== requiredRole) {
        return res.status(403).json({
          status: false,
          message: "Access denied",
        });
      }

      next();
    } catch (error) {
      console.error("Role middleware error:", error.message);

      return res.status(500).json({
        status: false,
        message: "Authorization check failed",
      });
    }
  };
};

module.exports = roleMiddleware;
