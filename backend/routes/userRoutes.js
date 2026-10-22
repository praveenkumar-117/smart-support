const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  updatePassword,
} = require("../controllers/userController");

router.get(
  "/getuser",
  authMiddleware,
  roleMiddleware("support_admin"),
  getUsers,
);

router.get(
  "/getuser/:id",
  authMiddleware,
  roleMiddleware("support_admin"),
  getUserById,
);

router.patch(
  "/updateuser",
  authMiddleware,
  upload.single("profileImage"),
  updateUser,
);

router.patch("/change-password",authMiddleware, updatePassword);

router.post(
  "/createuser",
  authMiddleware,
  roleMiddleware("support_admin"),
  createUser
);

router.delete(
  "/deleteuser/:id",
  authMiddleware,
  roleMiddleware("support_admin"),
  deleteUser
);

module.exports = router;
