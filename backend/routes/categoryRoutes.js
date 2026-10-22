const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createCategory,getCategories
} = require("../controllers/categoryController");

router.get("/", authMiddleware, getCategories);

router.post(
  "/createcategory",
  authMiddleware,
  roleMiddleware("support_admin"),
  createCategory
);

module.exports = router;