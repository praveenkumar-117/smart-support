
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
 
  userLogin,
  getCurrentUser,
  logoutUser,
} = require("../controllers/authController");



router.post("/login", userLogin);

router.get("/me", authMiddleware, getCurrentUser);

router.post("/logout", authMiddleware, logoutUser);

module.exports = router;
